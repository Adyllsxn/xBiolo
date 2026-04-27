'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FiDollarSign } from 'react-icons/fi';

interface TicketMedioCardProps {
  averageOrderValue: string;
}

export function TicketMedioCard({ averageOrderValue }: TicketMedioCardProps) {
  return (
    <Card className="lg:col-span-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-100">Ticket Médio</p>
            <p className="text-3xl font-bold mt-2">{averageOrderValue}</p>
            <p className="text-xs text-orange-100 mt-2">Valor médio por pedido</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FiDollarSign className="w-8 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}