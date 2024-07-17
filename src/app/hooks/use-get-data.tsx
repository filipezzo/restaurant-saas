import { useQuery } from "@tanstack/react-query";
import { getOrders, GetOrdersQuery } from "../api/get-orders";

export function useGetOrders({
  customerName,
  orderId,
  pageIndex,
  status,
}: GetOrdersQuery) {
  return useQuery({
    queryKey: ["orders", pageIndex, customerName, orderId, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === "all" ? null : status,
      }),
  });
}
