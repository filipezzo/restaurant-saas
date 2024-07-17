import { useQuery } from "@tanstack/react-query";
import {
  GetOrderDetailsParams,
  getOrdersDetails,
} from "../api/get-orders-details";

export default function useGetOrdersDetails({
  orderId,
  open,
}: GetOrderDetailsParams) {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrdersDetails({ orderId }),
    enabled: open,
  });
}
