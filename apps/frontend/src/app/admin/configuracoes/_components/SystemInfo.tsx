'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiDatabase, FiCpu, FiClock } from 'react-icons/fi';
import { CONFIGURACOES_CONFIG } from '../_constants/config';
import type { SystemHealth, SystemInfo } from '@/lib/modules/system';

interface SystemInfoProps {
  health: SystemHealth | null;
  info: SystemInfo | null;
}

export function SystemInfo({ health, info }: SystemInfoProps) {
  const section = CONFIGURACOES_CONFIG.sections.system;
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
        {health && (
          <>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <FiDatabase className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Banco de dados</span>
              </div>
              <Badge className={health.database === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {health.database}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Tempo online</span>
              </div>
              <span className="text-sm font-medium">{health.uptime}</span>
            </div>
          </>
        )}
        {info && (
          <>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <FiCpu className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">CPU</span>
              </div>
              <span className="text-sm font-medium">{info.cpu.cores} núcleos</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <FiDatabase className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Memória</span>
              </div>
              <span className="text-sm font-medium">{info.memoryUsage}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Versão</span>
              </div>
              <span className="text-sm font-medium">v{info.version}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}