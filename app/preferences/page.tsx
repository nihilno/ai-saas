import Title from "@/components/dashboard/title";
import SelectForm from "@/components/preferences/select-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preferences",
};

export default function SelectPage() {
  return (
    <section className="mx-auto max-w-5xl scroll-mt-24 px-4 py-8">
      <Title subtitle="Select your interests and delivery frequency to start receiving personalized newsletters.">
        Customize <span className="text-primary">Your</span>
        <br /> Newsletter
      </Title>
      <SelectForm />
    </section>
  );
}
