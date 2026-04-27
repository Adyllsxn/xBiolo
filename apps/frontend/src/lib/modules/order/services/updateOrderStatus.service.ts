import { api } from "@/lib/api.connection";
import type { OrderResponse } from "../types/order.types";

export async function updateOrderStatus(id: string, status: string): Promise<OrderResponse> {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
}