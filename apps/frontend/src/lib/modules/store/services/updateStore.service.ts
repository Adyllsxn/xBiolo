import { api } from "@/lib/api.connection";
import type { Store } from "../types/store.types";

export interface UpdateStoreData {
  name?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  primaryColor?: string;
}

export async function updateStore(data: UpdateStoreData): Promise<Store> {
  const response = await api.patch("/store", data);
  return response.data;
}