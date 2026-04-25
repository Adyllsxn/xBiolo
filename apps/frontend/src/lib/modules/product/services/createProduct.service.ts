import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export interface CreateProductData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  categoryId: string;
  variations?: string[];
  active?: boolean;
  featured?: boolean;
  stock?: number;
  file?: File;
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const formData = new FormData();
  
  formData.append('name', data.name);
  formData.append('slug', data.slug);
  if (data.description) formData.append('description', data.description);
  formData.append('price', String(data.price));
  formData.append('categoryId', data.categoryId);
  if (data.variations && data.variations.length) {
    formData.append('variations', data.variations.join(','));
  }
  if (data.active !== undefined) formData.append('active', String(data.active));
  if (data.featured !== undefined) formData.append('featured', String(data.featured));
  if (data.stock !== undefined) formData.append('stock', String(data.stock));
  if (data.file) formData.append('file', data.file);
  
  const response = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}