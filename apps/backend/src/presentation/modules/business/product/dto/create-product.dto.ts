import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Vestido Semba', description: 'Nome do produto' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'vestido-semba',
    description: 'Slug para URL amigável',
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Vestido em algodão com estampa floral' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 28500, description: 'Preço em Kz' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: '37d01a5e-7ec4-45f9-b155-03a8c52c2f70' })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({ example: ['P', 'M', 'G'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  variations?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;
}
