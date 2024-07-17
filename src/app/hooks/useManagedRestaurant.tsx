import { useQuery } from "@tanstack/react-query";
import { getManagedResturants } from "../api/get-managed-restaurant";

export function useManagedRestaurant() {
  return useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedResturants,
  });
}
