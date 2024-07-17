import { api } from "../lib/api";


export interface UpdateManagedProps {
name: string
description: string | null
}

export async function updateManagedRestaurant({name, description}:UpdateManagedProps ){
await api.put('/profile', {name, description})
}