import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export async function deleteCategory(id: string): Promise<Category> {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
}