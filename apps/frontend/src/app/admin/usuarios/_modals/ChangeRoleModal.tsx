'use client';

import { useState, useEffect } from 'react';
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
import { USUARIOS_CONFIG, ROLE_OPTIONS } from '../_constants/usuarios';
import { updateUserRole, type User } from '@/lib/modules/account';

interface ChangeRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export function ChangeRoleModal({ open, onClose, onSuccess, user }: ChangeRoleModalProps) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>('employee');

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(user.role);
    }
  }, [user]);

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserRole({ userId: user.id, role: role as 'admin' | 'employee' });
      alert(USUARIOS_CONFIG.messages.roleSuccess);
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
          <DialogTitle>{USUARIOS_CONFIG.modal.role.title}</DialogTitle>
          <DialogDescription>{USUARIOS_CONFIG.modal.role.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a função" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {USUARIOS_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm} disabled={loading}>
              {loading ? USUARIOS_CONFIG.buttons.save.saving : USUARIOS_CONFIG.buttons.confirm.text}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}