import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api/sign-out";

export default function useSignout() {
  return useMutation({
    mutationFn: signOut,
  });
}
