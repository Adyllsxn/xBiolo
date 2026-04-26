import { api } from "@/lib/api.connection";
import type { SystemInfo } from "../types/system.types";

export async function getSystemInfo(): Promise<SystemInfo> {
  const response = await api.get("/system/info");
  return response.data;
}