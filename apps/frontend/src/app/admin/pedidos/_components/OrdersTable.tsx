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
import { FiEye, FiEdit2, FiXCircle } from 'react-icons/fi';
import { PEDIDOS_CONFIG } from '../_constants/pedidos';
import type { Order } from '@/lib/modules/order';

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (order: Order) => void;
  onCancel: (order: Order) => void;
}

export function OrdersTable({ orders, onViewDetails, onUpdateStatus, onCancel }: OrdersTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = PEDIDOS_CONFIG.status[status as keyof typeof PEDIDOS_CONFIG.status];
    if (!statusConfig) return <Badge>{status}</Badge>;
    
    return (
      <Badge className={statusConfig.className}>
        <span className="mr-1">{statusConfig.icon}</span>
        {statusConfig.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const canCancel = (status: string): boolean => {
    return status === 'pending';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{PEDIDOS_CONFIG.table.columns.id}</TableHead>
            <TableHead>{PEDIDOS_CONFIG.table.columns.client}</TableHead>
            <TableHead>{PEDIDOS_CONFIG.table.columns.phone}</TableHead>
            <TableHead>{PEDIDOS_CONFIG.table.columns.total}</TableHead>
            <TableHead>{PEDIDOS_CONFIG.table.columns.status}</TableHead>
            <TableHead>{PEDIDOS_CONFIG.table.columns.date}</TableHead>
            <TableHead className="text-right">{PEDIDOS_CONFIG.table.columns.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
              <TableCell className="font-medium">{order.clientName}</TableCell>
              <TableCell>{order.clientPhone}</TableCell>
              <TableCell className="font-semibold">{formatCurrency(order.total)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(order)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  title={PEDIDOS_CONFIG.buttons.viewDetails.text}
                >
                  <FiEye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateStatus(order)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  title={PEDIDOS_CONFIG.buttons.updateStatus.text}
                >
                  <FiEdit2 className="w-4 h-4" />
                </Button>
                {canCancel(order.status) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancel(order)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    title={PEDIDOS_CONFIG.buttons.cancel.text}
                  >
                    <FiXCircle className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}