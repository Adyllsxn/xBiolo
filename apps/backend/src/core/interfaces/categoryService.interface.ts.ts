import { ICategory } from '../types/category.type';

export interface ICategoryService {
  findAll(): Promise<ICategory[]>;
  findOne(id: string): Promise<ICategory | null>;
}
