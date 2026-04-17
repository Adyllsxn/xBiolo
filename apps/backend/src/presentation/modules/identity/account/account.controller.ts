import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

// TODO: Pegar userId do usuário logado (quando tivermos autenticação)
const TEMP_ADMIN_ID = '42f4ab74-95e4-4748-b409-6b8610a8d182';

@ApiTags('account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo utilizador (admin)' })
  @ApiResponse({ status: 201, description: 'Utilizador criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto, TEMP_ADMIN_ID);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os utilizadores (admin)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar utilizador por nome' })
  @ApiQuery({ name: 'name', required: true, example: 'João' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByName(
    @Query('name') name: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.accountService.findByName(name, paginationDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Dados do próprio utilizador logado' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso' })
  findMe() {
    return this.accountService.findMe(TEMP_ADMIN_ID);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar utilizador por ID (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador encontrado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar utilizador' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador atualizado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto, TEMP_ADMIN_ID);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete utilizador (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador deletado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador já está deletado' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(id, TEMP_ADMIN_ID);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar utilizador deletado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador restaurado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador não está deletado' })
  restore(@Param('id') id: string) {
    return this.accountService.restore(id, TEMP_ADMIN_ID);
  }
}
