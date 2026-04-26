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
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { USUARIOS_CONFIG } from '../_constants/usuarios';
import { createUser } from '@/lib/modules/account';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function CreateUserModal({ open, onClose, onSuccess }: CreateUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      toast.success(USUARIOS_CONFIG.toast.createSuccess.title, {
        description: USUARIOS_CONFIG.toast.createSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'employee',
      });
      setShowPassword(false);
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{USUARIOS_CONFIG.modal.create.title}</DialogTitle>
          <DialogDescription>{USUARIOS_CONFIG.modal.create.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{USUARIOS_CONFIG.form.name.label}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={USUARIOS_CONFIG.form.name.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>{USUARIOS_CONFIG.form.email.label}</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={USUARIOS_CONFIG.form.email.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>{USUARIOS_CONFIG.form.password.label}</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={USUARIOS_CONFIG.form.password.placeholder}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {USUARIOS_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              {loading ? USUARIOS_CONFIG.buttons.save.saving : USUARIOS_CONFIG.buttons.save.text}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}