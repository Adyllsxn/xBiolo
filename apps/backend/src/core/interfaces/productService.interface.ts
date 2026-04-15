import { IProduct, IProductWithCategory } from '../types/product.type';
import { CreateProductDto } from 'src/presentation/modules/business/product/dto/create-product.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

export interface IProductService {
  // Queries
  findAll(paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  
  findOne(id: string): Promise<IProductWithCategory>;
  
  findByCategory(categoryId: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  
  findByName(name: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
 
  // Commands
  create(data: CreateProductDto): Promise<IProduct>;
}