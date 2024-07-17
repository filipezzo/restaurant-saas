import { api } from "../lib/api"

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}
export async function getManagedResturants(){
  
  const {data} = await api.get<GetManagedRestaurantResponse>('/managed-restaurant', )
  return data

}