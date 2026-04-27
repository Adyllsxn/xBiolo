import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/generated/enums';
import { PaginationDto } from '@core/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/core/types/authenticated-user.type';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo pedido (cliente finaliza compra)' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os pedidos com paginação' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do pedido (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.orderService.updateStatus(id, updateOrderDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancelar pedido' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido cancelado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.orderService.updateStatus(
      id,
      { status: OrderStatus.cancelled },
      user.id,
    );
  }
}
