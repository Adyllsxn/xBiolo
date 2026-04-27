import { api } from "@/lib/api.connection";
import type { Product, UpdateProductDto } from "../types/product.types";

export async function updateProduct(id: string, data: UpdateProductDto & { file?: File }): Promise<Product> {
  const formData = new FormData();
  
  if (data.name !== undefined) formData.append('name', data.name);
  if (data.slug !== undefined) formData.append('slug', data.slug);
  if (data.description !== undefined) formData.append('description', data.description);
  if (data.price !== undefined) formData.append('price', String(data.price));
  if (data.categoryId !== undefined) formData.append('categoryId', data.categoryId);
  if (data.variations !== undefined && data.variations.length) {
    formData.append('variations', data.variations.join(','));
  }
  if (data.active !== undefined) formData.append('active', String(data.active));
  if (data.featured !== undefined) formData.append('featured', String(data.featured));
  if (data.stock !== undefined) formData.append('stock', String(data.stock));
  if (data.file) formData.append('file', data.file);
  
  const response = await api.patch(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}