import { api } from "@/lib/api.connection";

export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await api.delete(`/account/${id}`);
  return response.data;
}