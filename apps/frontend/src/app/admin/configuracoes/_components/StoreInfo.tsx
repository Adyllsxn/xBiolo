'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CONFIGURACOES_CONFIG } from '../_constants/config';

interface StoreInfoProps {
  store: {
    name: string;
    email: string;
    whatsapp: string;
    address: string;
  };
}

export function StoreInfo({ store }: StoreInfoProps) {
  const section = CONFIGURACOES_CONFIG.sections.store;
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
        <div className="space-y-1">
          <Label>{section.fields.name.label}</Label>
          <p className="text-gray-800 font-medium">{store.name}</p>
        </div>
        <div className="space-y-1">
          <Label>{section.fields.email.label}</Label>
          <p className="text-gray-800">{store.email}</p>
        </div>
        <div className="space-y-1">
          <Label>{section.fields.whatsapp.label}</Label>
          <p className="text-gray-800">{store.whatsapp}</p>
        </div>
        <div className="space-y-1">
          <Label>{section.fields.address.label}</Label>
          <p className="text-gray-800">{store.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}