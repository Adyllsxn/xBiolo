'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/modules/account';
import type { User } from '@/lib/modules/account';

interface UseAuthReturn {
  user: User | null;
  role: 'admin' | 'employee' | null;
  isLoading: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const role = user?.role || null;
  const isAdmin = role === 'admin';
  const isEmployee = role === 'employee';

  return {
    user,
    role,
    isLoading,
    isAdmin,
    isEmployee,
  };
}