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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { CATEGORIAS_CONFIG } from '../_constants/categorias';
import { updateCategory, type Category } from '@/lib/modules/category';

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  order: string;
  active: boolean;
}

export function EditCategoryModal({ open, onClose, onSuccess, category }: EditCategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    order: '0',
    active: true,
  });

  useEffect(() => {
    if (category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        order: String(category.order),
        active: category.active,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
    setLoading(true);
    
    try {
      const updateData: {
        name?: string;
        slug?: string;
        description?: string;
        order?: number;
        active?: boolean;
      } = {};
      
      if (formData.name !== category.name) updateData.name = formData.name;
      if (formData.slug !== category.slug) updateData.slug = formData.slug;
      if (formData.description !== (category.description || '')) updateData.description = formData.description;
      if (parseInt(formData.order) !== category.order) updateData.order = parseInt(formData.order);
      if (formData.active !== category.active) updateData.active = formData.active;
      
      await updateCategory(category.id, updateData);
      
      alert(CATEGORIAS_CONFIG.messages.updateSuccess);
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{CATEGORIAS_CONFIG.modal.edit.title}</DialogTitle>
          <DialogDescription>{CATEGORIAS_CONFIG.modal.edit.description}</DialogDescription>
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