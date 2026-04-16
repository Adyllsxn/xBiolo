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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Produto com este slug já existe' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

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

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'Conflito de slug' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete - esconder produto' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto já está deletado' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar produto deletado' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto restaurado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto não está deletado' })
  restore(@Param('id') id: string) {
    return this.productService.restore(id);
  }

  @Patch(':id/stock')
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
  updateStock(@Param('id') id: string, @Query('quantity') quantity: string) {
    const quantityNum = parseInt(quantity, 10);
    return this.productService.updateStock(id, quantityNum);
  }
}
