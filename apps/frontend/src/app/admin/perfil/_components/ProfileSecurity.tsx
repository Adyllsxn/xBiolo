'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiShield } from 'react-icons/fi';
import { PERFIL_CONFIG } from '../_constants/perfil';

export function ProfileSecurity() {
  const section = PERFIL_CONFIG.sections.security;

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiShield className="w-5 h-5 text-orange-500" />
          {section.title}
        </CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          {section.buttonText}
        </Button>
        <p className="text-xs text-gray-400 mt-3">{section.helperText}</p>
      </CardContent>
    </Card>
  );
}