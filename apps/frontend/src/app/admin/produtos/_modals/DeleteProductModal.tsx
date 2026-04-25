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
import { PRODUTOS_CONFIG } from '../_constants/produtos';
import { deleteProduct, type Product } from '@/lib/modules/product';

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

export function DeleteProductModal({ open, onClose, onSuccess, product }: DeleteProductModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await deleteProduct(product.id);
      alert(PRODUTOS_CONFIG.messages.deleteSuccess);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(PRODUTOS_CONFIG.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{PRODUTOS_CONFIG.modal.delete.title}</DialogTitle>
          <DialogDescription>{PRODUTOS_CONFIG.modal.delete.description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-500">{PRODUTOS_CONFIG.modal.delete.warning}</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {PRODUTOS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? PRODUTOS_CONFIG.buttons.save.saving : PRODUTOS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}