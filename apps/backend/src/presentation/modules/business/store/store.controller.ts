import {
  Controller,
  Get,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { UpdateStoreDto } from './dto/update-store.dto';

// TODO: Pegar userId do usuário logado (quando tivermos autenticação)
const TEMP_ADMIN_ID = '42f4ab74-95e4-4748-b409-6b8610a8d182';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar configurações da loja' })
  @ApiResponse({ status: 200, description: 'Configurações encontradas' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas' })
  findOne() {
    return this.storeService.findOne();
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar configurações da loja' })
  @ApiResponse({ status: 200, description: 'Configurações atualizadas' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas' })
  @HttpCode(HttpStatus.OK)
  update(@Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(updateStoreDto, TEMP_ADMIN_ID);
  }
}
