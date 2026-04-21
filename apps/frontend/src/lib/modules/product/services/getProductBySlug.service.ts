import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Primeiro busca todos (ou faz uma busca por slug no backend)
  const response = await api.get("/products", { params: { page: 1, limit: 100 } });
  const products = response.data.data;
  const product = products.find((p: Product) => p.slug === slug);
  
  if (!product) return null;
  
  // Busca detalhes completos pelo ID
  const detailResponse = await api.get(`/products/${product.id}`);
  return detailResponse.data;
}