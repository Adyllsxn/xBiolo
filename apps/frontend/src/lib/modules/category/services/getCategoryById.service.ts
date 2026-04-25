import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export async function getCategoryById(id: string): Promise<Category> {
  const response = await api.get(`/categories/${id}`);
  return response.data;
}