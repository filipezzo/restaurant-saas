import { api } from "../lib/api"

export interface DispatchOrder {
  orderId: string
}



export async function dispatchOrder({orderId}:DispatchOrder){
 await api.patch(`/orders/${orderId}/dispatch`)
}