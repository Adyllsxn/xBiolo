import { ICategory } from '../types/category.type';
import { CreateCategoryDto } from 'src/presentation/modules/business/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/presentation/modules/business/category/dto/update-category.dto';

export interface ICategoryService {
  // Queries
  findAll(): Promise<ICategory[]>;
  findOne(id: string): Promise<ICategory>;

  // Commands
  create(data: CreateCategoryDto, userId: string): Promise<ICategory>;
  update(
    id: string,
    data: UpdateCategoryDto,
    userId: string,
  ): Promise<ICategory>;
  remove(id: string, userId: string): Promise<ICategory>;
  restore(id: string, userId: string): Promise<ICategory>;
}
