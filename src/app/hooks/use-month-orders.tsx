import { useQuery } from "@tanstack/react-query";
import { getMonthOrdersAmount } from "../api/get-month-orders";

export default function useMonthOrders() {
  return useQuery({
    queryKey: ["monthOrders"],
    queryFn: getMonthOrdersAmount,
  });
}
