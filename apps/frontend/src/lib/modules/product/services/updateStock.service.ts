import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function updateStock(id: string, quantity: number): Promise<Product> {
  const response = await api.patch(`/products/${id}/stock?quantity=${quantity}`);
  return response.data;
}