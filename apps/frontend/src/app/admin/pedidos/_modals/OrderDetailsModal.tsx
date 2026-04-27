'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiUser, FiPhone, FiMapPin, FiPackage } from 'react-icons/fi';
import { PEDIDOS_CONFIG } from '../_constants/pedidos';
import type { OrderResponse } from '@/lib/modules/order';

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderResponse | null;
}

export function OrderDetailsModal({ open, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = PEDIDOS_CONFIG.status[status as keyof typeof PEDIDOS_CONFIG.status];
    if (!statusConfig) return <Badge>{status}</Badge>;
    return <Badge className={statusConfig.className}>{statusConfig.label}</Badge>;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('pt-BR');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{PEDIDOS_CONFIG.modal.details.title}</DialogTitle>
          <DialogDescription>
            Pedido #{order.id.slice(0, 8)} • {formatDate(order.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do cliente */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FiUser className="w-4 h-4" /> Dados do cliente
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FiUser className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Nome:</span>
                <span className="font-medium">{order.clientName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Telefone:</span>
                <span className="font-medium">{order.clientPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Endereço:</span>
                <span className="font-medium">{order.clientAddress}</span>
              </div>
            </div>
          </div>

          {/* Itens do pedido */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FiPackage className="w-4 h-4" /> Itens do pedido
            </h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity}x • Tamanho {item.variation}
                    </p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-orange-500">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Status e pagamento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              {getStatusBadge(order.status)}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Método de pagamento</p>
              <p className="font-medium capitalize">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              {PEDIDOS_CONFIG.buttons.close.text}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}