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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PRODUTOS_CONFIG } from '../_constants/produtos';
import { updateStock, type Product } from '@/lib/modules/product';

interface UpdateStockModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

export function UpdateStockModal({ open, onClose, onSuccess, product }: UpdateStockModalProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');

  const handleConfirm = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await updateStock(product.id, parseInt(quantity));
      
      toast.success(PRODUTOS_CONFIG.toast.stockSuccess.title, {
        description: PRODUTOS_CONFIG.toast.stockSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
      setQuantity('');
    } catch (error) {
      console.error(error);
      toast.error(PRODUTOS_CONFIG.toast.error.title, {
        description: PRODUTOS_CONFIG.toast.error.description,
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
          <DialogTitle>{PRODUTOS_CONFIG.modal.stock.title}</DialogTitle>
          <DialogDescription>{PRODUTOS_CONFIG.modal.stock.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Quantidade atual: {product?.stock}</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nova quantidade"
            required
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {PRODUTOS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm} disabled={loading}>
            {loading ? PRODUTOS_CONFIG.buttons.save.saving : PRODUTOS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}