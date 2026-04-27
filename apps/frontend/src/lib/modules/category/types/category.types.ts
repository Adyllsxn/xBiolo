export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  order: number;
  deletedAt: string | null;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
}