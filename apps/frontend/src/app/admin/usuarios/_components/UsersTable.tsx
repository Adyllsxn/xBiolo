'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FiEdit2, FiTrash2, FiRefreshCw, FiShield } from 'react-icons/fi';
import { USUARIOS_CONFIG } from '../_constants/usuarios';
import type { User } from '@/lib/modules/account';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore: (user: User) => void;
  onChangeRole: (user: User) => void;
}

export function UsersTable({ users, onEdit, onDelete, onRestore, onChangeRole }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    const roleConfig = USUARIOS_CONFIG.role[role as keyof typeof USUARIOS_CONFIG.role];
    if (!roleConfig) return <Badge>{role}</Badge>;
    return <Badge className={roleConfig.className}>{roleConfig.label}</Badge>;
  };

  const getStatusBadge = (user: User) => {
    if (user.deletedAt) {
      return <Badge className={USUARIOS_CONFIG.status.deleted.className}>{USUARIOS_CONFIG.status.deleted.label}</Badge>;
    }
    if (user.active) {
      return <Badge className={USUARIOS_CONFIG.status.active.className}>{USUARIOS_CONFIG.status.active.label}</Badge>;
    }
    return <Badge className={USUARIOS_CONFIG.status.inactive.className}>{USUARIOS_CONFIG.status.inactive.label}</Badge>;
  };

  const formatDate = (date: string | null): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const isCurrentUser = (user: User): boolean => {
    // Verificar se é o próprio usuário logado (admin não pode se excluir)
    return user.role === 'admin' && user.email === 'admin@biolo.ao';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{USUARIOS_CONFIG.table.columns.name}</TableHead>
            <TableHead>{USUARIOS_CONFIG.table.columns.email}</TableHead>
            <TableHead>{USUARIOS_CONFIG.table.columns.role}</TableHead>
            <TableHead>{USUARIOS_CONFIG.table.columns.status}</TableHead>
            <TableHead>{USUARIOS_CONFIG.table.columns.lastLogin}</TableHead>
            <TableHead>{USUARIOS_CONFIG.table.columns.createdAt}</TableHead>
            <TableHead className="text-right">{USUARIOS_CONFIG.table.columns.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user)}</TableCell>
              <TableCell>{formatDate(user.lastLogin)}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-right space-x-2">
                {!user.deletedAt && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      title={USUARIOS_CONFIG.buttons.edit.text}
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChangeRole(user)}
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      title={USUARIOS_CONFIG.buttons.changeRole.text}
                    >
                      <FiShield className="w-4 h-4" />
                    </Button>
                  </>
                )}
                {user.deletedAt ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRestore(user)}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    title={USUARIOS_CONFIG.buttons.restore.text}
                  >
                    <FiRefreshCw className="w-4 h-4" />
                  </Button>
                ) : (
                  !isCurrentUser(user) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title={USUARIOS_CONFIG.buttons.delete.text}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}