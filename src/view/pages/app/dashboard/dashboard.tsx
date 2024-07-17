import OverviewCards from "./overview-cards";
import { PopularProductsChart } from "./popular-chart";
import { RevenueChart } from "./revenue-chart";

export function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <OverviewCards />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-9">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </div>
  );
}
