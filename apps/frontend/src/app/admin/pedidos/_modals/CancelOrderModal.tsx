'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PEDIDOS_CONFIG } from '../_constants/pedidos';
import { cancelOrder, type Order } from '@/lib/modules/order';

interface CancelOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  order: Order | null;
}

export function CancelOrderModal({ open, onClose, onSuccess, order }: CancelOrderModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!order) return;
    setLoading(true);
    try {
      await cancelOrder(order.id);
      alert(PEDIDOS_CONFIG.messages.cancelSuccess);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(PEDIDOS_CONFIG.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{PEDIDOS_CONFIG.modal.cancel.title}</DialogTitle>
          <DialogDescription>{PEDIDOS_CONFIG.modal.cancel.description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-500">{PEDIDOS_CONFIG.modal.cancel.warning}</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {PEDIDOS_CONFIG.buttons.close.text}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? PEDIDOS_CONFIG.buttons.confirm.text + '...' : PEDIDOS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}