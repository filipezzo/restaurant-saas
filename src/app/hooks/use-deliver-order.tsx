import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliverOrder } from "../api/deliver-order";
import { updateOrderCacheData } from "./use-cancel-order";

export function useDeliveredOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deliverOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderCacheData(queryClient, orderId, "delivered");
    },
  });
}
