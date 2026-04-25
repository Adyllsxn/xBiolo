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
import { restoreProduct, type Product } from '@/lib/modules/product';

interface RestoreProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

export function RestoreProductModal({ open, onClose, onSuccess, product }: RestoreProductModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await restoreProduct(product.id);
      alert(PRODUTOS_CONFIG.messages.restoreSuccess);
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
          <DialogTitle>{PRODUTOS_CONFIG.modal.restore.title}</DialogTitle>
          <DialogDescription>{PRODUTOS_CONFIG.modal.restore.description}</DialogDescription>
        </DialogHeader>
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