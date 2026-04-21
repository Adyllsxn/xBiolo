import { api } from "@/lib/api.connection";
import type { Product, PaginatedResponse } from "../types/product.types";

export async function getAllProducts(
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Product>> {
  const response = await api.get("/products", { params: { page, limit } });
  return response.data;
}