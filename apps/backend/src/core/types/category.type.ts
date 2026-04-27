export type ICategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdById?: string | null;
  updatedById?: string | null;
};
