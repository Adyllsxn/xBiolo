import { api } from "@/lib/api.connection";

export async function deleteProduct(id: string): Promise<{ message: string }> {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}