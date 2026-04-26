import { api } from "@/lib/api.connection";
import type { OrderResponse } from "../types/order.types";

export async function cancelOrder(id: string): Promise<OrderResponse> {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
}