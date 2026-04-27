import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Vestidos' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'vestidos' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Vestidos para todas ocasiões' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
