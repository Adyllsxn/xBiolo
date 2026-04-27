import { api } from "@/lib/api.connection";

export interface UpdateRoleData {
  userId: string;
  role: 'admin' | 'employee';
}

export async function updateUserRole(data: UpdateRoleData): Promise<{ message: string; user: { id: string; name: string; email: string; role: string } }> {
  const response = await api.patch("/permission/users/role", data);
  return response.data;
}