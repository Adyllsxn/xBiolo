import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export async function restoreCategory(id: string): Promise<Category> {
  const response = await api.patch(`/categories/${id}/restore`);
  return response.data;
}