export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  active: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};