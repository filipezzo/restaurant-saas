import { useMutation } from "@tanstack/react-query";
import { RegisterRestaurant } from "../api/register";

export function useRegister() {
  return useMutation({
    mutationFn: RegisterRestaurant,
  });
}
