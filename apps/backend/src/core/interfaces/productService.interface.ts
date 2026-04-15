import { IProduct, IProductWithCategory } from '../types/product.type';
import { CreateProductDto } from 'src/presentation/modules/business/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/presentation/modules/business/product/dto/update-product.dto';

export interface IProductService {
  // Queries
  findAll(): Promise<IProductWithCategory[]>;
  findOne(id: string): Promise<IProductWithCategory>;
  findByCategory(categoryId: string): Promise<IProductWithCategory[]>;
  findFeatured(): Promise<IProductWithCategory[]>;

  // Commands
  create(data: CreateProductDto): Promise<IProduct>;
  update(id: string, data: UpdateProductDto): Promise<IProduct>;
  remove(id: string): Promise<{ message: string; product: IProduct }>;
  restore(id: string): Promise<{ message: string; product: IProduct }>;

  // Estoque
  updateStock(id: string, quantity: number): Promise<IProduct>;

  // Views
  incrementViews(id: string): Promise<IProduct>;
}
