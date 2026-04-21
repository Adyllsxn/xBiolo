import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IProductService } from 'src/core/interfaces/productService.interface';
import { IProduct, IProductWithCategory } from 'src/core/types/product.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PaginationDto,
  PaginationHelper,
} from 'src/core/pagination/pagination.dto';
import { UploadService } from 'src/infrastructure/storage/upload.service';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    data: CreateProductDto,
    userId: string,
    imageFile?: Express.Multer.File,
  ): Promise<IProduct> {
    const existingBySlug = await this.prismaService.product.findFirst({
      where: { slug: data.slug, deletedAt: null },
    });

    if (existingBySlug) {
      throw new ConflictException(`Produto com slug "${data.slug}" já existe`);
    }

    const category = await this.prismaService.category.findFirst({
      where: { id: data.categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria com ID "${data.categoryId}" não encontrada`,
      );
    }

    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await this.uploadService.saveImage(imageFile, 'products');
    }

    const product = await this.prismaService.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        variations: data.variations ?? [],
        imageUrl: imageUrl,
        active: data.active ?? true,
        featured: data.featured ?? false,
        stock: data.stock ?? 0,
        createdById: userId,
        updatedById: userId,
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
    await this.prismaService.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

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

  async findByCategory(
    categoryId: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IProductWithCategory[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const category = await this.prismaService.category.findFirst({
      where: { id: categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria com ID "${categoryId}" não encontrada`,
      );
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

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<{
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

  async update(
    id: string,
    data: UpdateProductDto,
    userId: string,
    imageFile?: Express.Multer.File,
  ): Promise<IProduct> {
    const existingProduct = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (data.slug) {
      const slugExists = await this.prismaService.product.findFirst({
        where: { slug: data.slug, id: { not: id }, deletedAt: null },
      });

      if (slugExists) {
        throw new ConflictException(
          `Produto com slug "${data.slug}" já existe`,
        );
      }
    }

    if (data.categoryId) {
      const category = await this.prismaService.category.findFirst({
        where: { id: data.categoryId, deletedAt: null },
      });

      if (!category) {
        throw new NotFoundException(
          `Categoria com ID "${data.categoryId}" não encontrada`,
        );
      }
    }

    let imageUrl = existingProduct.imageUrl;

    if (imageFile) {
      if (existingProduct.imageUrl) {
        this.uploadService.deleteImage(existingProduct.imageUrl);
      }
      imageUrl = await this.uploadService.saveImage(imageFile, 'products');
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
        imageUrl: imageUrl,
        active: data.active,
        featured: data.featured,
        stock: data.stock,
        updatedById: userId,
      },
    });

    return {
      ...product,
      variations: product.variations as string[] | null,
    } as IProduct;
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt !== null) {
      throw new BadRequestException(
        `Produto "${product.name}" já está deletado`,
      );
    }

    if (product.imageUrl) {
      this.uploadService.deleteImage(product.imageUrl);
    }

    const deletedProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });

    return {
      message: `Produto "${product.name}" foi deletado com sucesso`,
      product: {
        ...deletedProduct,
        variations: deletedProduct.variations as string[] | null,
      } as IProduct,
    };
  }

  async restore(
    id: string,
    userId: string,
  ): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt === null) {
      throw new BadRequestException(
        `Produto "${product.name}" não está deletado`,
      );
    }

    const restoredProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        deletedAt: null,
        updatedById: userId,
      },
    });

    return {
      message: `Produto "${product.name}" foi restaurado com sucesso`,
      product: {
        ...restoredProduct,
        variations: restoredProduct.variations as string[] | null,
      } as IProduct,
    };
  }

  async updateStock(
    id: string,
    quantity: number,
    userId: string,
  ): Promise<IProduct> {
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
      data: {
        stock: quantity,
        updatedById: userId,
      },
    });

    return {
      ...updatedProduct,
      variations: updatedProduct.variations as string[] | null,
    } as IProduct;
  }
}
