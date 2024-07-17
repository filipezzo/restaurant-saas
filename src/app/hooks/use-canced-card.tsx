import { useQuery } from "@tanstack/react-query";
import { getMonthCanceledOrdersAmount } from "../api/get-month-canceled";

export function useCanceledCard() {
  return useQuery({
    queryKey: ["canceledOrders"],
    queryFn: getMonthCanceledOrdersAmount,
  });
}
