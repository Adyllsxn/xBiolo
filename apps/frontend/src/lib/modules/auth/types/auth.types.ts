export interface LogoutResponse {
  message: string;
}

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