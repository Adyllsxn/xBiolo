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
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { toast } from 'sonner';
import { CONFIGURACOES_CONFIG } from '../_constants/config';
import { updateStore, type Store } from '@/lib/modules/store';

interface EditConfigModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  store: Store | null;
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  primaryColor: string;
}

export function EditConfigModal({ open, onClose, onSuccess, store }: EditConfigModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    primaryColor: '#E05A2A',
  });

  useEffect(() => {
    if (store) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: store.name,
        email: store.email || '',
        whatsapp: store.whatsapp,
        address: store.address || '',
        primaryColor: store.primaryColor,
      });
    }
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    
    setLoading(true);
    
    try {
      const updateData: {
        name?: string;
        email?: string;
        whatsapp?: string;
        address?: string;
        primaryColor?: string;
      } = {};
      
      if (formData.name !== store.name) updateData.name = formData.name;
      if (formData.email !== store.email) updateData.email = formData.email;
      if (formData.whatsapp !== store.whatsapp) updateData.whatsapp = formData.whatsapp;
      if (formData.address !== store.address) updateData.address = formData.address;
      if (formData.primaryColor !== store.primaryColor) updateData.primaryColor = formData.primaryColor;
      
      await updateStore(updateData);
      
      toast.success(CONFIGURACOES_CONFIG.toast.success.title, {
        description: CONFIGURACOES_CONFIG.toast.success.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(CONFIGURACOES_CONFIG.toast.error.title, {
        description: CONFIGURACOES_CONFIG.toast.error.description,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const section = CONFIGURACOES_CONFIG.sections.store;
  const appearance = CONFIGURACOES_CONFIG.sections.appearance;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar configurações</DialogTitle>
          <DialogDescription>Altere as informações da sua loja</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{section.fields.name.label}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={section.fields.name.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              {section.fields.email.label}
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={section.fields.email.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FiPhone className="w-4 h-4" />
              {section.fields.whatsapp.label}
            </Label>
            <Input
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder={section.fields.whatsapp.placeholder}
              required
            />
            <p className="text-xs text-gray-400">{section.fields.whatsapp.helper}</p>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4" />
              {section.fields.address.label}
            </Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={section.fields.address.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>{appearance.fields.primaryColor.label}</Label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="w-12 h-12 rounded-lg border cursor-pointer"
              />
              <Input
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="flex-1 font-mono"
              />
            </div>
            <div
              className="mt-3 p-4 rounded-lg transition-all"
              style={{ backgroundColor: formData.primaryColor }}
            >
              <p className="text-white text-sm text-center">Pré-visualização da cor principal</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {CONFIGURACOES_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              {loading ? CONFIGURACOES_CONFIG.buttons.save.saving : CONFIGURACOES_CONFIG.buttons.save.text}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}