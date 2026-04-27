import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function restoreUser(id: string): Promise<{ message: string; account: User }> {
  const response = await api.patch(`/account/${id}/restore`);
  return response.data;
}