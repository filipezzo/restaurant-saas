import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dispatchOrder } from "../api/dispatch-order";
import { updateOrderCacheData } from "./use-cancel-order";

export function useDispatchOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderCacheData(queryClient, orderId, "delivering");
    },
  });
}
