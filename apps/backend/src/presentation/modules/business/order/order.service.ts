import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IOrderService } from 'src/core/interfaces/orderService.interface';
import { IOrder } from 'src/core/types/order.type';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  PaginationDto,
  PaginationHelper,
} from 'src/core/pagination/pagination.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
    const { clientName, clientAddress, clientPhone, paymentMethod, items } =
      createOrderDto;

    // Calcula o total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Cria o pedido e os itens numa transação
    const order = await this.prismaService.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          clientName,
          clientAddress,
          clientPhone: clientPhone || null,
          paymentMethod,
          total,
        },
      });

      // Cria os itens do pedido
      for (const item of items) {
        await prisma.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            variation: item.variation || null,
          },
        });

        // Atualiza o stock do produto
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return this.findOne(order.id);
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IOrder[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
        },
      }),
      this.prismaService.order.count(),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }

  async findOne(id: string): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }

    return order as IOrder;
  }

  async updateStatus(
    id: string,
    updateOrderDto: UpdateOrderDto,
    userId: string,
  ): Promise<IOrder> {
    await this.findOne(id);

    const updatedOrder = await this.prismaService.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status,
        updatedById: userId,
      },
      include: {
        items: true,
      },
    });

    return updatedOrder as IOrder;
  }
}
