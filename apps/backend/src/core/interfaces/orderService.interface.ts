import { IOrder } from '../types/order.type';
import { CreateOrderDto } from 'src/presentation/modules/business/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/presentation/modules/business/order/dto/update-order.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

export interface IOrderService {
  create(createOrderDto: CreateOrderDto): Promise<IOrder>;
  findAll(paginationDto: PaginationDto): Promise<{
    data: IOrder[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findOne(id: string): Promise<IOrder>;
  updateStatus(
    id: string,
    updateOrderDto: UpdateOrderDto,
    userId: string,
  ): Promise<IOrder>;
}
