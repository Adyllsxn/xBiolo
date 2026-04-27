import { api } from "@/lib/api.connection";
import type { SystemHealth } from "../types/system.types";

export async function getSystemHealth(): Promise<SystemHealth> {
  const response = await api.get("/system/health");
  return response.data;
}