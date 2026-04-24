import { api } from "@/lib/api.connection";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    tokenExpires: string;
  };
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post('/auth/login', credentials);
  return response.data;
}