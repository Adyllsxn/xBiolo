import { api } from "@/lib/api.connection";
import type { LogoutResponse } from "../types/auth.types";

export async function logout(): Promise<LogoutResponse> {
  const response = await api.post("/auth/logout");
  return response.data;
}