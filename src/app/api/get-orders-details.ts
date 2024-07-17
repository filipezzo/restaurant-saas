import { api } from "../lib/api"

export interface GetOrderDetailsParams {
  orderId: string
  open?: boolean
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrdersDetails({orderId}:GetOrderDetailsParams) {
    const {data} = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)
    return data
}