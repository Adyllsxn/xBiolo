import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/generated/enums';

export class UpdateOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus, example: 'approved' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
