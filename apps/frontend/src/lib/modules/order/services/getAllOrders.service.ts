import { api } from "@/lib/api.connection";
import type { PaginatedOrdersResponse } from "../types/order.types";

export async function getAllOrders(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedOrdersResponse> {
  const response = await api.get("/orders", { params: { page, limit } });
  return response.data;
}