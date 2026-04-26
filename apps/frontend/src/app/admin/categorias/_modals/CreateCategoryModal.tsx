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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { CATEGORIAS_CONFIG } from '../_constants/categorias';
import { createCategory } from '@/lib/modules/category';

interface CreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  order: string;
  active: boolean;
}

export function CreateCategoryModal({ open, onClose, onSuccess }: CreateCategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    order: '0',
    active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createCategory({
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        order: parseInt(formData.order),
        active: formData.active,
      });
      
      toast.success(CATEGORIAS_CONFIG.toast.createSuccess.title, {
        description: CATEGORIAS_CONFIG.toast.createSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
      setFormData({
        name: '',
        slug: '',
        description: '',
        order: '0',
        active: true,
      });
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{CATEGORIAS_CONFIG.modal.create.title}</DialogTitle>
          <DialogDescription>{CATEGORIAS_CONFIG.modal.create.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{CATEGORIAS_CONFIG.form.name.label}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={CATEGORIAS_CONFIG.form.name.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>{CATEGORIAS_CONFIG.form.slug.label}</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder={CATEGORIAS_CONFIG.form.slug.placeholder}
              required
            />
            <p className="text-xs text-gray-500">{CATEGORIAS_CONFIG.form.slug.helper}</p>
          </div>
          
          <div className="space-y-2">
            <Label>{CATEGORIAS_CONFIG.form.description.label}</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={CATEGORIAS_CONFIG.form.description.placeholder}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>{CATEGORIAS_CONFIG.form.order.label}</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              placeholder={CATEGORIAS_CONFIG.form.order.placeholder}
            />
            <p className="text-xs text-gray-500">{CATEGORIAS_CONFIG.form.order.helper}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{CATEGORIAS_CONFIG.form.active.label}</Label>
              <p className="text-xs text-gray-500">{CATEGORIAS_CONFIG.form.active.description}</p>
            </div>
            <Switch checked={formData.active} onCheckedChange={(v) => setFormData({ ...formData, active: v })} />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {CATEGORIAS_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              {loading ? CATEGORIAS_CONFIG.buttons.save.saving : CATEGORIAS_CONFIG.buttons.save.text}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}