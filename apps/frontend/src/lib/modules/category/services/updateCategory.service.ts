import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  order?: number;
  active?: boolean;
}

export async function updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
  const response = await api.patch(`/categories/${id}`, data);
  return response.data;
}