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
import { USUARIOS_CONFIG } from '../_constants/usuarios';
import { restoreUser, type User } from '@/lib/modules/account';

interface RestoreUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export function RestoreUserModal({ open, onClose, onSuccess, user }: RestoreUserModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await restoreUser(user.id);
      alert(USUARIOS_CONFIG.messages.restoreSuccess);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(USUARIOS_CONFIG.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{USUARIOS_CONFIG.modal.restore.title}</DialogTitle>
          <DialogDescription>{USUARIOS_CONFIG.modal.restore.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {USUARIOS_CONFIG.buttons.cancel.text}
          </Button>
          <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm} disabled={loading}>
            {loading ? USUARIOS_CONFIG.buttons.save.saving : USUARIOS_CONFIG.buttons.confirm.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}