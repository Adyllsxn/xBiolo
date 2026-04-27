import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}