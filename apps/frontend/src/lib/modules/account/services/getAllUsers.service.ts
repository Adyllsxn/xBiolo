import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export interface PaginatedUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAllUsers(
  page: number = 1,
  limit: number = 8
): Promise<PaginatedUsersResponse> {
  const response = await api.get("/account", { params: { page, limit } });
  return response.data;
}