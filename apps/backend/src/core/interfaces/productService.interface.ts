import { IProduct, IProductWithCategory } from '../types/product.type';
import { CreateProductDto } from 'src/presentation/modules/business/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/presentation/modules/business/product/dto/update-product.dto';
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

  findByCategory(
    categoryId: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  // Commands
  create(data: CreateProductDto): Promise<IProduct>;
  update(id: string, data: UpdateProductDto): Promise<IProduct>;
  remove(id: string): Promise<{ message: string; product: IProduct }>;
  restore(id: string): Promise<{ message: string; product: IProduct }>;
  updateStock(id: string, quantity: number): Promise<IProduct>;
}
