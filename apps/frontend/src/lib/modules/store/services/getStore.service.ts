import { api } from "@/lib/api.connection";
import type { Store } from "../types/store.types";

export async function getStore(): Promise<Store> {
  const response = await api.get("/store");
  return response.data;
}