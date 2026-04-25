import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function restoreProduct(id: string): Promise<{ message: string; product: Product }> {
  const response = await api.patch(`/products/${id}/restore`);
  return response.data;
}