'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FiShoppingCart } from 'react-icons/fi';
import { DASHBOARD_CONFIG, type StatusMapKey } from '../_constants/dashboard';
import type { Order } from '@/lib/modules';

interface PedidosRecentesTableProps {
  orders: Order[];
  formatCurrency: (value: number) => string;
}

export function PedidosRecentesTable({ orders, formatCurrency }: PedidosRecentesTableProps) {
  const getStatusConfig = (status: string) => {
    const statusKey = status as StatusMapKey;
    return DASHBOARD_CONFIG.statusMap[statusKey] || { label: status, variant: 'secondary' as const };
  };

  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="bg-gray-50/50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FiShoppingCart className="w-5 h-5 text-orange-500" />
              Pedidos Recentes
            </CardTitle>
            <CardDescription>Últimos 5 pedidos realizados</CardDescription>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            {orders.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-600">Cliente</TableHead>
              <TableHead className="font-semibold text-gray-600">Telefone</TableHead>
              <TableHead className="font-semibold text-gray-600">Total</TableHead>
              <TableHead className="font-semibold text-gray-600">Status</TableHead>
              <TableHead className="font-semibold text-gray-600">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <TableRow key={order.id} className="hover:bg-orange-50/30 transition-colors">
                  <TableCell className="font-medium text-gray-800">{order.clientName}</TableCell>
                  <TableCell className="text-gray-600">{order.clientPhone || '-'}</TableCell>
                  <TableCell className="font-semibold text-orange-600">{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              );
            })}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  {DASHBOARD_CONFIG.messages.noOrders}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}