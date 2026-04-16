import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

export class SearchProductDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'Vestido',
    description: 'Nome do produto para busca',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
