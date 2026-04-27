'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CONFIGURACOES_CONFIG } from '../_constants/config';

interface AppearanceInfoProps {
  primaryColor: string;
}

export function AppearanceInfo({ primaryColor }: AppearanceInfoProps) {
  const section = CONFIGURACOES_CONFIG.sections.appearance;
  const Icon = section.icon;

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-orange-500" />
          {section.title}
        </CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{section.fields.primaryColor.label}</Label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="font-mono text-sm">{primaryColor}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}