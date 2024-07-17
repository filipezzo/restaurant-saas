import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { OrderStatus } from "../../view/pages/app/components/order-status";
import { cancelOrder } from "../api/cancel-order";
import { GetOrdersResponse } from "../api/get-orders";

export function updateOrderCacheData(
  client: QueryClient,
  orderId: string,
  status: OrderStatus,
) {
  const listOnCache = client.getQueriesData<GetOrdersResponse>({
    queryKey: ["orders"],
  });
  listOnCache.forEach(([key, data]) => {
    if (!data) {
      return;
    }
    client.setQueryData<GetOrdersResponse>(key, {
      ...data,
      orders: data.orders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status };
        }
        return order;
      }),
    });
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderCacheData(queryClient, orderId, "canceled");
    },
  });
}
