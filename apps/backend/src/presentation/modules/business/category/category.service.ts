import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICategory } from 'src/core/types/category.type';
import { ICategoryService } from 'src/core/interfaces/categoryService.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ICategory[]> {
    return await this.prismaService.category.findMany({
      where: { deletedAt: null },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string): Promise<ICategory> {
    const category = await this.prismaService.category.findFirst({
      where: { id, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada`);
    }

    return category;
  }

  async create(data: CreateCategoryDto): Promise<ICategory> {
    // Verifica se já existe categoria com mesmo nome (não deletada)
    const existingByName = await this.prismaService.category.findFirst({
      where: { name: data.name, deletedAt: null },
    });

    if (existingByName) {
      throw new ConflictException(
        `Categoria com nome "${data.name}" já existe`,
      );
    }

    // Verifica se já existe categoria com mesmo slug (não deletada)
    const existingBySlug = await this.prismaService.category.findFirst({
      where: { slug: data.slug, deletedAt: null },
    });

    if (existingBySlug) {
      throw new ConflictException(
        `Categoria com slug "${data.slug}" já existe`,
      );
    }

    return await this.prismaService.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<ICategory> {
    // Verifica se a categoria existe
    await this.findOne(id);

    // Verifica se novo nome já existe em outra categoria (não deletada)
    if (data.name) {
      const existingByName = await this.prismaService.category.findFirst({
        where: { name: data.name, id: { not: id }, deletedAt: null },
      });

      if (existingByName) {
        throw new ConflictException(
          `Categoria com nome "${data.name}" já existe`,
        );
      }
    }

    // Verifica se novo slug já existe em outra categoria (não deletada)
    if (data.slug) {
      const existingBySlug = await this.prismaService.category.findFirst({
        where: { slug: data.slug, id: { not: id }, deletedAt: null },
      });

      if (existingBySlug) {
        throw new ConflictException(
          `Categoria com slug "${data.slug}" já existe`,
        );
      }
    }

    return await this.prismaService.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        order: data.order,
        active: data.active,
      },
    });
  }

  async remove(id: string): Promise<ICategory> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada`);
    }

    if (category.deletedAt !== null) {
      throw new BadRequestException(
        `Categoria "${category.name}" já está deletada`,
      );
    }

    return await this.prismaService.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string): Promise<ICategory> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada`);
    }

    if (category.deletedAt === null) {
      throw new BadRequestException(
        `Categoria "${category.name}" não está deletada`,
      );
    }

    return await this.prismaService.category.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
