export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string;
  variations: string[];
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  stock: number;
  views: number;
  deletedAt: string | null;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateProductDto = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  categoryId: string;
  variations?: string[];
  active?: boolean;
  featured?: boolean;
  stock?: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;