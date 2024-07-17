import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "../api/get-popular-products";

export default function usePopularProducts() {
  return useQuery({
    queryKey: ["popular-product"],
    queryFn: getPopularProducts,
  });
}
