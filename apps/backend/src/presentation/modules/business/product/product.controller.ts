import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/core/types/authenticated-user.type';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos (com paginação)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar produtos por nome (com paginação)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByName(@Query() searchDto: SearchProductDto) {
    if (!searchDto.name) {
      return this.productService.findAll(searchDto);
    }
    return this.productService.findByName(searchDto.name, searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID (incrementa views)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Buscar produtos por categoria (com paginação)' })
  @ApiParam({ name: 'categoryId', description: 'UUID da categoria' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.findByCategory(categoryId, paginationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo produto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        categoryId: { type: 'string' },
        variations: { type: 'array', items: { type: 'string' } },
        active: { type: 'boolean' },
        featured: { type: 'boolean' },
        stock: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Produto com este slug já existe' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const createProductDto: CreateProductDto = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: parseFloat(body.price),
      categoryId: body.categoryId,
      variations: this.parseVariations(body.variations),
      active: body.active === 'true',
      featured: body.featured === 'true',
      stock: body.stock ? parseInt(body.stock, 10) : 0,
    };

    return this.productService.create(createProductDto, user.id, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        categoryId: { type: 'string' },
        variations: { type: 'array', items: { type: 'string' } },
        active: { type: 'boolean' },
        featured: { type: 'boolean' },
        stock: { type: 'number' },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'Conflito de slug' })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const updateProductDto: UpdateProductDto = {};

    if (body.name) updateProductDto.name = body.name;
    if (body.slug) updateProductDto.slug = body.slug;
    if (body.description) updateProductDto.description = body.description;
    if (body.price) updateProductDto.price = parseFloat(body.price);
    if (body.categoryId) updateProductDto.categoryId = body.categoryId;
    if (body.variations)
      updateProductDto.variations = this.parseVariations(body.variations);
    if (body.active) updateProductDto.active = body.active === 'true';
    if (body.featured) updateProductDto.featured = body.featured === 'true';
    if (body.stock) updateProductDto.stock = parseInt(body.stock, 10);

    return this.productService.update(id, updateProductDto, user.id, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete - esconder produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto já está deletado' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.productService.remove(id, user.id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar produto deletado' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto restaurado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto não está deletado' })
  restore(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.productService.restore(id, user.id);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar estoque do produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiQuery({
    name: 'quantity',
    required: true,
    example: 10,
    description: 'Nova quantidade em estoque',
  })
  @ApiResponse({ status: 200, description: 'Estoque atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Quantidade inválida' })
  updateStock(
    @Param('id') id: string,
    @Query('quantity') quantity: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const quantityNum = parseInt(quantity, 10);
    return this.productService.updateStock(id, quantityNum, user.id);
  }

  private parseVariations(variations: any): string[] {
    if (!variations) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(variations)) return variations;

    if (typeof variations === 'string') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsed = JSON.parse(variations);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return variations.split(',').map((v: string) => v.trim());
      }
    }

    return [];
  }
}
