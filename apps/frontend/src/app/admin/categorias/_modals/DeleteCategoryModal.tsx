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
import { CATEGORIAS_CONFIG } from '../_constants/categorias';
import { deleteCategory, type Category } from '@/lib/modules/category';

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

export function DeleteCategoryModal({ open, onClose, onSuccess, category }: DeleteCategoryModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!category) return;
    setLoading(true);
    try {
      await deleteCategory(category.id);
      alert(CATEGORIAS_CONFIG.messages.deleteSuccess);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(CATEGORIAS_CONFIG.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{CATEGORIAS_CONFIG.modal.delete.title}</DialogTitle>
          <DialogDescription>{CATEGORIAS_CONFIG.modal.delete.description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-500">{CATEGORIAS_CONFIG.modal.delete.warning}</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {CATEGORIAS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? CATEGORIAS_CONFIG.buttons.save.saving : CATEGORIAS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}