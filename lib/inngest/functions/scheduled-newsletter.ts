import { sendEmail } from "@/lib/apis/email";
import { fetchArticles } from "@/lib/apis/news";
import { inngest } from "@/lib/inngest/client";
import { marked } from "marked";

// export default inngest.createFunction(
//   { id: "newsletter/scheduled" },
//   { event: "newsletter.schedule" },
//   async ({ event, step }) => {
//     const categories = event.data.categories;
//     const allArticles = await step.run("fetch-news", async () => {
//       return fetchArticles(categories);
//     });

//     // ai summary
//     const summary = await step.ai.infer("summarize-news", {
//       model: step.ai.models.openai({ model: "gpt-4o" }),
//       body: {
//         messages: [
//           {
//             role: "system",
//             content: `You are an expert newsletter editor creating a personalized newsletter.
//               Write a concise, engaging summary that:
//               - Highlights the most important stories
//               - Provides context and insights
//               - Uses a friendly, conversational tone
//               - Is well-structured with clear sections
//               - Keeps the reader informed and engaged
//               Format the response as a proper newsletter with a title and organized content.
//               Make it email-friendly with clear sections and engaging subject lines.`,
//           },
//           {
//             role: "user",
//             content: `Create a newsletter summary for these articles from the past week.
//               Categories requested: ${event.data.categories.join(", ")}

//               Articles:
//               ${allArticles
//                 .map(
//                   (article: any, index: number) =>
//                     `${index + 1}. ${article.title}\n   ${
//                       article.description
//                     }\n   Source: ${article.url}\n`,
//                 )
//                 .join("\n")}`,
//           },
//         ],
//       },
//     });

//     const newsletterContent = summary.choices[0].message.content;
//     if (!newsletterContent) {
//       throw new Error("Failed to generate newsletter content.");
//     }

//     const htmlResult = await marked(newsletterContent);

//     await step.run("send-email", async () => {
//       await sendEmail(
//         event.data.email,
//         event.data.categories.join(", "),
//         allArticles.length,
//         htmlResult,
//       );
//     });

//     return {};
//   },
// );

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.schedule" },
  async ({ event, step }) => {
    const categories = event.data.categories;

    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    // === TEMPORARY: Skip AI summary to test if this step is the problem ===
    // const summary = await step.ai.infer("summarize-news", { ... });

    // Placeholder content instead
    const newsletterContent = `
# Test Newsletter (AI Step Skipped)

Hello!

This is a test run with the AI summary step disabled.
Categories: ${event.data.categories.join(", ")}
Number of articles fetched: ${allArticles.length}

If you receive this email, it means the function ran successfully end-to-end without the step.ai.infer() call.
    `.trim();

    // === End of temporary block ===

    const htmlResult = await marked(newsletterContent);

    await step.run("send-email", async () => {
      await sendEmail(
        event.data.email,
        event.data.categories.join(", "),
        allArticles.length,
        htmlResult,
      );
    });

    return {
      status: "test-run-successful",
      articlesFetched: allArticles.length,
    };
  },
);
