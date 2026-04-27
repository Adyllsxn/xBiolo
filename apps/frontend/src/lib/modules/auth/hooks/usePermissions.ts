'use client';

import { useAuth } from './useAuth';

export function usePermissions() {
  const { role, isLoading, isAdmin, isEmployee } = useAuth();

  const canCreate = isAdmin;
  const canEdit = isAdmin;
  const canDelete = isAdmin;
  const canRestore = isAdmin;
  const canUpdateStock = isAdmin;
  const canManageUsers = isAdmin;
  const canManageSettings = isAdmin;

  return {
    isLoading,
    role,
    isAdmin,
    isEmployee,
    canCreate,
    canEdit,
    canDelete,
    canRestore,
    canUpdateStock,
    canManageUsers,
    canManageSettings,
  };
}