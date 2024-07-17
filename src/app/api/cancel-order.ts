import { api } from "../lib/api"

export interface CancelOrder {
  orderId: string
}



export async function cancelOrder({orderId}:CancelOrder){
 await api.patch(`/orders/${orderId}/cancel`)
}