import CancelCard from "./cancel-card";
import { DayOrdersCard } from "./day-orders-card";
import { MonthOrdersCard } from "./month-orders-card";
import RevenueCard from "./revenue-card";

export default function OverviewCards() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <RevenueCard />
      <MonthOrdersCard />
      <DayOrdersCard />
      <CancelCard />
    </section>
  );
}
