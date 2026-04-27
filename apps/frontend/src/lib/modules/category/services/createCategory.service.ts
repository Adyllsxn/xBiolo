import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  order?: number;
  active?: boolean;
}

export async function createCategory(data: CreateCategoryData): Promise<Category> {
  const response = await api.post('/categories', data);
  return response.data;
}