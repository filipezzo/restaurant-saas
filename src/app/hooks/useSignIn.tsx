import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/sign-in";

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
