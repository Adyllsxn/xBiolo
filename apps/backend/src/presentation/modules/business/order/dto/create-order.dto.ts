import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '@prisma/generated/enums';

export class CreateOrderItemDto {
  @ApiProperty({ example: '2903b710-5b01-40e5-b32a-bdddb58c81f8' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'Vestido Semba' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 28500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 'M' })
  @IsOptional()
  @IsString()
  variation?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  clientName: string;

  @ApiProperty({ example: 'Luanda, Angola' })
  @IsString()
  clientAddress: string;

  @ApiPropertyOptional({ example: '923456789' })
  @IsOptional()
  @IsString()
  clientPhone?: string;

  @ApiProperty({ enum: PaymentMethod, example: 'card' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
