'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FiTrendingUp } from 'react-icons/fi';

interface TotalPedidosCardProps {
  ordersCount: number;
}

export function TotalPedidosCard({ ordersCount }: TotalPedidosCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <FiTrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total de Pedidos</p>
            <p className="text-2xl font-bold text-gray-800">{ordersCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}