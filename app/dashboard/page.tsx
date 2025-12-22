import Cards from "@/components/dashboard/cards";
import Explanation from "@/components/dashboard/explanation";
import Title from "@/components/dashboard/title";

export default function DashboardPage() {
  return (
    <section className="py-8">
      <div className="px-4">
        <Title />
        <Cards />
      </div>
      <Explanation />
    </section>
  );
}
