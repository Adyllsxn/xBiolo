import { api } from '@/lib/api.connection';
import type { User } from '../types/user.types';

export async function getMe(): Promise<User> {
  const response = await api.get('/account/me');
  return response.data;
}