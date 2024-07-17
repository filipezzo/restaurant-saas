import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveOrder } from "../api/approve-order";
import { updateOrderCacheData } from "./use-cancel-order";

export function useAprovedOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderCacheData(queryClient, orderId, "processing");
    },
  });
}
