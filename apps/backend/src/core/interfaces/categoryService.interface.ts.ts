import { ICategory } from '../types/category.type';
import { CreateCategoryDto } from 'src/presentation/modules/business/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/presentation/modules/business/category/dto/update-category.dto';

export interface ICategoryService {
  findAll(): Promise<ICategory[]>;
  findOne(id: string): Promise<ICategory | null>;
  create(data: CreateCategoryDto): Promise<ICategory>;
  update(id: string, data: UpdateCategoryDto): Promise<ICategory>;
  remove(id: string): Promise<ICategory>;
  restore(id: string): Promise<ICategory>;
}
