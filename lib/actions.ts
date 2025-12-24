"use server";

import { revalidatePath } from "next/cache";
import { inngest } from "./inngest/client";
import { createClient } from "./supabase/server";

export async function changeStatus(is_active: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be Signed In to perform this action.",
    };
  }

  try {
    const { error } = await supabase
      .from("user_preferences")
      .update({ is_active })
      .eq("user_id", user.id);

    if (error) {
      return {
        success: false,
        message: "We couldn’t save your changes. Try again in a moment.",
      };
    }

    if (!is_active) {
      await inngest.send({
        name: "newsletter.schedule.deleted",
        data: {
          user_id: user.id,
        },
      });
    } else {
      const { data: preferences, error } = await supabase
        .from("user_preferences")
        .select("categories, frequency, email")
        .eq("user_id", user.id)
        .single();

      if (!preferences || error) {
        console.error(error);
        return {
          success: false,
          message: "User preferences not found.",
        };
      }

      const { frequency, categories, email } = preferences;

      const now = new Date();
      let nextScheduleTime: Date;

      switch (frequency) {
        case "daily":
          nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;

        case "weekly":
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;

        case "biweekly":
          nextScheduleTime = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          break;

        default:
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      }

      nextScheduleTime.setHours(9, 0, 0, 0);

      await inngest.send({
        name: "newsletter.schedule",
        data: {
          user_id: user.id,
          categories,
          email,
          frequency,
        },
        ts: nextScheduleTime.getTime(),
      });
    }

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to update user_preferences.is_active:", error);
    return {
      success: false,
      message: "Something went wrong on our side. Try again shortly.",
    };
  }
}
