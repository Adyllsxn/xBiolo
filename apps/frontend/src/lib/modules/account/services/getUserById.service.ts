import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function getUserById(id: string): Promise<User> {
  const response = await api.get(`/account/${id}`);
  return response.data;
}