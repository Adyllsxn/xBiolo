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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiUser, FiMail, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import { PERFIL_CONFIG } from '../_constants/perfil';
import { updateUser } from '@/lib/modules/account';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  currentName: string;
  currentEmail: string;
}

export function EditProfileModal({ open, onClose, onSuccess, userId, currentName, currentEmail }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentName,
    email: currentEmail,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      name: currentName,
      email: currentEmail,
    });
  }, [currentName, currentEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData: { name?: string; email?: string } = {};
      if (formData.name !== currentName) updateData.name = formData.name;
      if (formData.email !== currentEmail) updateData.email = formData.email;
      
      if (Object.keys(updateData).length > 0) {
        await updateUser(userId, updateData);
      }
      
      toast.success(PERFIL_CONFIG.toast.profileSuccess.title, {
        description: PERFIL_CONFIG.toast.profileSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(PERFIL_CONFIG.toast.error.title, {
        description: PERFIL_CONFIG.toast.error.description,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{PERFIL_CONFIG.modal.edit.title}</DialogTitle>
          <DialogDescription>{PERFIL_CONFIG.modal.edit.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <FiUser className="w-4 h-4" />
              {PERFIL_CONFIG.sections.info.fields.name.label}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={PERFIL_CONFIG.sections.info.fields.name.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              {PERFIL_CONFIG.sections.info.fields.email.label}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={PERFIL_CONFIG.sections.info.fields.email.placeholder}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              <FiX className="w-4 h-4 mr-2" />
              {PERFIL_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              {loading ? (
                <>
                  <FiSave className="w-4 h-4 mr-2 animate-spin" />
                  {PERFIL_CONFIG.buttons.save.saving}
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  {PERFIL_CONFIG.buttons.save.text}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}