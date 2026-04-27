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
import { toast } from 'sonner';
import { CATEGORIAS_CONFIG } from '../_constants/categorias';
import { restoreCategory, type Category } from '@/lib/modules/category';

interface RestoreCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

export function RestoreCategoryModal({ open, onClose, onSuccess, category }: RestoreCategoryModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!category) return;
    setLoading(true);
    try {
      await restoreCategory(category.id);
      
      toast.success(CATEGORIAS_CONFIG.toast.restoreSuccess.title, {
        description: CATEGORIAS_CONFIG.toast.restoreSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(CATEGORIAS_CONFIG.toast.error.title, {
        description: CATEGORIAS_CONFIG.toast.error.description,
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
          <DialogTitle>{CATEGORIAS_CONFIG.modal.restore.title}</DialogTitle>
          <DialogDescription>{CATEGORIAS_CONFIG.modal.restore.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {CATEGORIAS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm} disabled={loading}>
            {loading ? CATEGORIAS_CONFIG.buttons.save.saving : CATEGORIAS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}