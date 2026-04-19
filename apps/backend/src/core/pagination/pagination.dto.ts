import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class PaginatedResult<T> {
  data: T[] | undefined;
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

export class PaginationHelper {
  static paginate<T>(data: T[], total: number, page: number, limit: number) {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static skip(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
