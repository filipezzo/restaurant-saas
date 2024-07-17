import { api } from "../lib/api"

export interface DeliverOrder {
  orderId: string
}



export async function deliverOrder({orderId}:DeliverOrder){
 await api.patch(`/orders/${orderId}/deliver`)
}