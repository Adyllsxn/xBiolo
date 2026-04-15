import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IProductService } from 'src/core/interfaces/productService.interface';
import { IProduct, IProductWithCategory } from 'src/core/types/product.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto, PaginationHelper } from 'src/core/pagination/pagination.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateProductDto): Promise<IProduct> {
    // Verifica se já existe produto com mesmo slug
    const existingBySlug = await this.prismaService.product.findFirst({
      where: { slug: data.slug, deletedAt: null },
    });

    if (existingBySlug) {
      throw new ConflictException(`Produto com slug "${data.slug}" já existe`);
    }

    // Verifica se a categoria existe
    const category = await this.prismaService.category.findFirst({
      where: { id: data.categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${data.categoryId}" não encontrada`);
    }

    const product = await this.prismaService.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        variations: data.variations ?? [],
        imageUrl: data.imageUrl ?? null,
        active: data.active ?? true,
        featured: data.featured ?? false,
        stock: data.stock ?? 0,
      },
    });

    return {
      ...product,
      variations: product.variations as string[] | null,
    } as IProduct;
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: { deletedAt: null },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      variations: product.variations as string[] | null,
    })) as IProductWithCategory[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async findOne(id: string): Promise<IProductWithCategory> {
    // Primeiro, incrementa as views
    await this.prismaService.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Depois, busca o produto com os dados atualizados
    const product = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    return {
      ...product,
      variations: product.variations as string[] | null,
    } as IProductWithCategory;
  }

  async findByCategory(categoryId: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    // Verifica se a categoria existe
    const category = await this.prismaService.category.findFirst({
      where: { id: categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`Categoria com ID "${categoryId}" não encontrada`);
    }

    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: { categoryId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: { categoryId, deletedAt: null },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      variations: product.variations as string[] | null,
    })) as IProductWithCategory[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async findByName(name: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      variations: product.variations as string[] | null,
    })) as IProductWithCategory[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async update(id: string, data: UpdateProductDto): Promise<IProduct> {
    // Verifica se o produto existe
    const existingProduct = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    // Verifica se o novo slug já existe em outro produto
    if (data.slug) {
      const slugExists = await this.prismaService.product.findFirst({
        where: { slug: data.slug, id: { not: id }, deletedAt: null },
      });

      if (slugExists) {
        throw new ConflictException(`Produto com slug "${data.slug}" já existe`);
      }
    }

    // Verifica se a nova categoria existe
    if (data.categoryId) {
      const category = await this.prismaService.category.findFirst({
        where: { id: data.categoryId, deletedAt: null },
      });

      if (!category) {
        throw new NotFoundException(`Categoria com ID "${data.categoryId}" não encontrada`);
      }
    }

    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        variations: data.variations,
        imageUrl: data.imageUrl,
        active: data.active,
        featured: data.featured,
        stock: data.stock,
      },
    });

    return {
      ...product,
      variations: product.variations as string[] | null,
    } as IProduct;
  }

  async remove(id: string): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt !== null) {
      throw new BadRequestException(`Produto "${product.name}" já está deletado`);
    }

    const deletedProduct = await this.prismaService.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      message: `Produto "${product.name}" foi deletado com sucesso`,
      product: {
        ...deletedProduct,
        variations: deletedProduct.variations as string[] | null,
      } as IProduct,
    };
  }

  async restore(id: string): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt === null) {
      throw new BadRequestException(`Produto "${product.name}" não está deletado`);
    }

    const restoredProduct = await this.prismaService.product.update({
      where: { id },
      data: { deletedAt: null },
    });

    return {
      message: `Produto "${product.name}" foi restaurado com sucesso`,
      product: {
        ...restoredProduct,
        variations: restoredProduct.variations as string[] | null,
      } as IProduct,
    };
  }

  async updateStock(id: string, quantity: number): Promise<IProduct> {
    const product = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (quantity < 0) {
      throw new BadRequestException(`Quantidade não pode ser negativa`);
    }

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: { stock: quantity },
    });

    return {
      ...updatedProduct,
      variations: updatedProduct.variations as string[] | null,
    } as IProduct;
  }
}