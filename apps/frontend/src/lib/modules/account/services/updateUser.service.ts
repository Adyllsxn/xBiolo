import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  const response = await api.patch(`/account/${id}`, data);
  return response.data;
}