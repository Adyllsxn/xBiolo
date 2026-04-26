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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PEDIDOS_CONFIG, STATUS_OPTIONS } from '../_constants/pedidos';
import { updateOrderStatus, type Order } from '@/lib/modules/order';

interface UpdateStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  order: Order | null;
}

export function UpdateStatusModal({ open, onClose, onSuccess, order }: UpdateStatusModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(order?.status || 'pending');

  const handleConfirm = async () => {
    if (!order) return;
    setLoading(true);
    try {
      await updateOrderStatus(order.id, status);
      
      toast.success(PEDIDOS_CONFIG.toast.statusSuccess.title, {
        description: PEDIDOS_CONFIG.toast.statusSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(PEDIDOS_CONFIG.toast.error.title, {
        description: PEDIDOS_CONFIG.toast.error.description,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{PEDIDOS_CONFIG.modal.status.title}</DialogTitle>
          <DialogDescription>{PEDIDOS_CONFIG.modal.status.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {PEDIDOS_CONFIG.buttons.close.text}
            </Button>
            <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm} disabled={loading}>
              {loading ? PEDIDOS_CONFIG.buttons.confirm.text + '...' : PEDIDOS_CONFIG.buttons.confirm.text}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}