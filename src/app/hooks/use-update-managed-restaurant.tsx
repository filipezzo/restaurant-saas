import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateManagedProps,
  updateManagedRestaurant,
} from "../api/update-managed-restaurant";

export function useUpdateManagedRestaurant() {
  const queryClient = useQueryClient();

  function updateMutationData({ name, description }: UpdateManagedProps) {
    const cached = queryClient.getQueryData<UpdateManagedProps>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<UpdateManagedProps>(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }

    return { cached };
  }

  return useMutation({
    mutationFn: updateManagedRestaurant,
    onMutate: ({ name, description }) => {
      const { cached } = updateMutationData({ name, description });
      return {
        previousData: cached,
      };
    },
    onError: (_, __, context) => {
      console.log(_, __);
      if (context?.previousData) {
        updateMutationData(context.previousData);
      }
    },
  });
}
