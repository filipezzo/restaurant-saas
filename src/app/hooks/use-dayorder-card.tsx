import { useQuery } from "@tanstack/react-query";
import { getDayOrdersAmount } from "../api/get-day-orders";

export default function useDayOrderCard() {
  return useQuery({
    queryKey: ["dailyOrders"],
    queryFn: getDayOrdersAmount,
  });
}
