import { api } from "@/lib/api.connection";
import type { ChangePasswordRequest, ChangePasswordResponse } from "../types/password.types";

export async function changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
  const response = await api.post('/password/change', data);
  return response.data;
}