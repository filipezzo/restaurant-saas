import { useQuery } from "@tanstack/react-query";
import { getMonthRevenue } from "../api/get-month-revenue";

export default function useGetRevenue() {
  return useQuery({
    queryKey: ["revenueTotal"],
    queryFn: getMonthRevenue,
  });
}
