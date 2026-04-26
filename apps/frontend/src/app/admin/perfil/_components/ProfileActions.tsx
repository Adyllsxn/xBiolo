'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FiEdit2, FiShield } from 'react-icons/fi';
import { PERFIL_CONFIG } from '../_constants/perfil';

interface ProfileActionsProps {
  onEdit: () => void;
  onChangePassword: () => void;
}

export function ProfileActions({ onEdit, onChangePassword }: ProfileActionsProps) {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiEdit2 className="w-5 h-5 text-orange-500" />
            {PERFIL_CONFIG.sections.info.title}
          </CardTitle>
          <CardDescription>{PERFIL_CONFIG.sections.info.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600">
            <FiEdit2 className="w-4 h-4 mr-2" />
            {PERFIL_CONFIG.buttons.edit.text}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiShield className="w-5 h-5 text-orange-500" />
            {PERFIL_CONFIG.sections.security.title}
          </CardTitle>
          <CardDescription>{PERFIL_CONFIG.sections.security.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={onChangePassword} className="border-orange-200 text-orange-600 hover:bg-orange-50">
            <FiShield className="w-4 h-4 mr-2" />
            Alterar senha
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}