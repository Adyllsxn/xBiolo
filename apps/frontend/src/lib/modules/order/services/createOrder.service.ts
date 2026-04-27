import { api } from "@/lib/api.connection";
import type { CreateOrderRequest, OrderResponse } from "../types/order.types";

export async function createOrder(orderData: CreateOrderRequest): Promise<OrderResponse> {
  const response = await api.post('/orders', orderData);
  return response.data;
}