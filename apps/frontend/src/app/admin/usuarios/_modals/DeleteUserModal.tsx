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
import { USUARIOS_CONFIG } from '../_constants/usuarios';
import { deleteUser, type User } from '@/lib/modules/account';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export function DeleteUserModal({ open, onClose, onSuccess, user }: DeleteUserModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteUser(user.id);
      
      toast.success(USUARIOS_CONFIG.toast.deleteSuccess.title, {
        description: USUARIOS_CONFIG.toast.deleteSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(USUARIOS_CONFIG.toast.error.title, {
        description: USUARIOS_CONFIG.toast.error.description,
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
          <DialogTitle>{USUARIOS_CONFIG.modal.delete.title}</DialogTitle>
          <DialogDescription>{USUARIOS_CONFIG.modal.delete.description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-500">{USUARIOS_CONFIG.modal.delete.warning}</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {USUARIOS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? USUARIOS_CONFIG.buttons.save.saving : USUARIOS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}