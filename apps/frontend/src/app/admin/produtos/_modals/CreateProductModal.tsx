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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PRODUTOS_CONFIG } from '../_constants/produtos';
import { createProduct } from '@/lib/modules/product';
import { getAllCategories, type Category } from '@/lib/modules/category';

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateProductModal({ open, onClose, onSuccess }: CreateProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    categoryId: '',
    stock: '',
    variations: '',
    active: true,
    featured: false,
    file: null as File | null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createProduct({
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        stock: parseInt(formData.stock) || 0,
        variations: formData.variations.split(',').map(v => v.trim()).filter(v => v),
        active: formData.active,
        featured: formData.featured,
        file: formData.file || undefined,
      });
      
      toast.success(PRODUTOS_CONFIG.toast.createSuccess.title, {
        description: PRODUTOS_CONFIG.toast.createSuccess.description,
        duration: 4000,
      });
      
      onSuccess();
      onClose();
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        categoryId: '',
        stock: '',
        variations: '',
        active: true,
        featured: false,
        file: null,
      });
    } catch (error) {
      console.error(error);
      toast.error(PRODUTOS_CONFIG.toast.error.title, {
        description: PRODUTOS_CONFIG.toast.error.description,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{PRODUTOS_CONFIG.modal.create.title}</DialogTitle>
          <DialogDescription>{PRODUTOS_CONFIG.modal.create.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.name.label}</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={PRODUTOS_CONFIG.form.name.placeholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.slug.label}</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder={PRODUTOS_CONFIG.form.slug.placeholder}
              required
            />
            <p className="text-xs text-gray-500">{PRODUTOS_CONFIG.form.slug.helper}</p>
          </div>
          
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.description.label}</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={PRODUTOS_CONFIG.form.description.placeholder}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{PRODUTOS_CONFIG.form.price.label}</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder={PRODUTOS_CONFIG.form.price.placeholder}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>{PRODUTOS_CONFIG.form.stock.label}</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder={PRODUTOS_CONFIG.form.stock.placeholder}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.categoryId.label}</Label>
            <Select value={formData.categoryId} onValueChange={(v) => setFormData({ ...formData, categoryId: v })}>
              <SelectTrigger>
                <SelectValue placeholder={PRODUTOS_CONFIG.form.categoryId.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.variations.label}</Label>
            <Input
              value={formData.variations}
              onChange={(e) => setFormData({ ...formData, variations: e.target.value })}
              placeholder={PRODUTOS_CONFIG.form.variations.placeholder}
            />
            <p className="text-xs text-gray-500">{PRODUTOS_CONFIG.form.variations.helper}</p>
          </div>
          
          <div className="space-y-2">
            <Label>{PRODUTOS_CONFIG.form.image.label}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{PRODUTOS_CONFIG.form.active.label}</Label>
              <p className="text-xs text-gray-500">{PRODUTOS_CONFIG.form.active.description}</p>
            </div>
            <Switch checked={formData.active} onCheckedChange={(v) => setFormData({ ...formData, active: v })} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{PRODUTOS_CONFIG.form.featured.label}</Label>
              <p className="text-xs text-gray-500">{PRODUTOS_CONFIG.form.featured.description}</p>
            </div>
            <Switch checked={formData.featured} onCheckedChange={(v) => setFormData({ ...formData, featured: v })} />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {PRODUTOS_CONFIG.buttons.cancel.text}
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              {loading ? PRODUTOS_CONFIG.buttons.save.saving : PRODUTOS_CONFIG.buttons.save.text}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}