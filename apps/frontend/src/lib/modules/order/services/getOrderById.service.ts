import { api } from "@/lib/api.connection";
import type { OrderResponse } from "../types/order.types";

export async function getOrderById(id: string): Promise<OrderResponse> {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}