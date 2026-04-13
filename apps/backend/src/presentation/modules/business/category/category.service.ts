import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICategoryService } from 'src/core/interfaces/categoryService.interface.ts';
import { ICategory } from 'src/core/types/category.type';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ICategory[]> {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string): Promise<ICategory | null> {
    return await this.prismaService.category.findUnique({
      where: { id },
    });
  }
}
