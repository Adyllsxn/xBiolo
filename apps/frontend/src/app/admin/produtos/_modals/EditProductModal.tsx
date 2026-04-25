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
import { PRODUTOS_CONFIG } from '../_constants/produtos';
import { updateProduct, type Product } from '@/lib/modules/product';
import { getAllCategories, type Category } from '@/lib/modules/category';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  categoryId: string;
  stock: string;
  variations: string;
  active: boolean;
  featured: boolean;
  file: File | null;
}

export function EditProductModal({ open, onClose, onSuccess, product }: EditProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: String(product.price),
        categoryId: product.categoryId,
        stock: String(product.stock),
        variations: product.variations?.join(', ') || '',
        active: product.active,
        featured: product.featured,
        file: null,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setLoading(true);
    
    try {
      const updateData: Partial<{
        name: string;
        slug: string;
        description: string;
        price: number;
        categoryId: string;
        stock: number;
        variations: string[];
        active: boolean;
        featured: boolean;
        file: File;
      }> = {};
      
      if (formData.name !== product.name) updateData.name = formData.name;
      if (formData.slug !== product.slug) updateData.slug = formData.slug;
      if (formData.description !== (product.description || '')) updateData.description = formData.description;
      if (parseFloat(formData.price) !== product.price) updateData.price = parseFloat(formData.price);
      if (formData.categoryId !== product.categoryId) updateData.categoryId = formData.categoryId;
      if (parseInt(formData.stock) !== product.stock) updateData.stock = parseInt(formData.stock);
      
      const variationsArray = formData.variations.split(',').map(v => v.trim()).filter(v => v);
      if (JSON.stringify(variationsArray) !== JSON.stringify(product.variations)) {
        updateData.variations = variationsArray;
      }
      
      if (formData.active !== product.active) updateData.active = formData.active;
      if (formData.featured !== product.featured) updateData.featured = formData.featured;
      if (formData.file) updateData.file = formData.file;
      
      await updateProduct(product.id, updateData);
      
      alert(PRODUTOS_CONFIG.messages.updateSuccess);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(PRODUTOS_CONFIG.messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{PRODUTOS_CONFIG.modal.edit.title}</DialogTitle>
          <DialogDescription>{PRODUTOS_CONFIG.modal.edit.description}</DialogDescription>
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