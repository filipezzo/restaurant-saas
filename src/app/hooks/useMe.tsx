import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/get-profile";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
  });
}
