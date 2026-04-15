export type IProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string;
  variations: string[] | null; // ["P", "M", "G"] ou []
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  stock: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

// Tipo para dados adicionais (com categoria incluída)
export type IProductWithCategory = IProduct & {
  category: {
    id: string;
    name: string;
    slug: string;
  };
};
