import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { UpdateRoleDto } from './dto/update-role.dto';

// TODO: Adicionar guards e decoradores quando tivermos autenticação
// @UseGuards(JwtAuthGuard, RolesGuard)
// @AdminOnly()
const TEMP_ADMIN_ID = '42f4ab74-95e4-4748-b409-6b8610a8d182';

@ApiTags('permission')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('roles')
  @ApiOperation({ summary: 'Listar todas as roles disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles retornada com sucesso',
  })
  // Remove o async - método síncrono
  listRoles() {
    return this.permissionService.listRoles();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Buscar role de um utilizador específico' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Role encontrada' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async getUserRole(@Param('id') id: string) {
    return this.permissionService.getUserRole(id);
  }

  @Patch('users/role')
  @ApiOperation({ summary: 'Alterar role de um utilizador' })
  @ApiResponse({ status: 200, description: 'Role alterada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async updateUserRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.permissionService.updateUserRole(updateRoleDto, TEMP_ADMIN_ID);
  }
}
