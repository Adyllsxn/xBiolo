'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PERFIL_CONFIG } from '../_constants/perfil';
import type { User } from '@/lib/modules/account';

interface ProfileInfoProps {
  user: User;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const roleInfo = PERFIL_CONFIG.roles[user.role as keyof typeof PERFIL_CONFIG.roles] || PERFIL_CONFIG.roles.employee;
  const statusInfo = user.active ? PERFIL_CONFIG.status.active : PERFIL_CONFIG.status.inactive;
  const StatusIcon = statusInfo.icon;

  const formatDate = (date: string | null): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-gray-500">Função</span>
        <Badge className={`${roleInfo.bg} ${roleInfo.color} hover:${roleInfo.bg}`}>
          {roleInfo.label}
        </Badge>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-gray-500">Status</span>
        <Badge className={`${statusInfo.bg} ${statusInfo.color} hover:${statusInfo.bg} flex items-center gap-1`}>
          <StatusIcon className="w-3 h-3" />
          {statusInfo.label}
        </Badge>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-gray-500">ID do Utilizador</span>
        <span className="text-xs font-mono text-gray-500">{user.id.slice(0, 8)}...</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-gray-500">Membro desde</span>
        <span className="text-sm text-gray-700">{formatDate(user.createdAt)}</span>
      </div>
      {user.lastLogin && (
        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-sm text-gray-500">Último acesso</span>
          <span className="text-sm text-gray-700">{formatDate(user.lastLogin)}</span>
        </div>
      )}
    </CardContent>
  );
}