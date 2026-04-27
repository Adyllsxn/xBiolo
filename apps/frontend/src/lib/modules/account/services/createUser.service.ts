import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: CreateUserData): Promise<User> {
  const response = await api.post("/account", data);
  return response.data;
}