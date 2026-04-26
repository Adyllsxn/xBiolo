import { api } from "@/lib/api.connection";
import type { ForgotPasswordRequest, ForgotPasswordResponse } from "../types/password.types";

export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const response = await api.post('/password/forgot', data);
  return response.data;
}