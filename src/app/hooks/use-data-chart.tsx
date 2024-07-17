import { useQuery } from "@tanstack/react-query";
import { getDailyRevenueInPeriod } from "../api/get-daily-revenue";

export function useDataChart() {
  return useQuery({
    queryKey: ["daily-revenue"],
    queryFn: () => getDailyRevenueInPeriod(),
  });
}
