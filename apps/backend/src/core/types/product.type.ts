export type IProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string;
  variations: string[] | null;
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  stock: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdById?: string | null;
  updatedById?: string | null;
};

export type IProductWithCategory = IProduct & {
  category: {
    id: string;
    name: string;
    slug: string;
  };
};
