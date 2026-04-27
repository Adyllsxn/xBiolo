import { api } from "@/lib/api.connection";
import type { Category } from "../types/category.types";

export async function getAllCategories(): Promise<Category[]> {
  const response = await api.get("/categories");
  return response.data;
}