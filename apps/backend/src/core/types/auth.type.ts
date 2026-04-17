export type ILoginResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
  tokenExpires: Date;
};

export type ICheckAuthResponse = {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
};

export type ILogoutResponse = {
  message: string;
};

export type IJwtPayload = {
  sub: string;
  email: string;
  role: string;
};
