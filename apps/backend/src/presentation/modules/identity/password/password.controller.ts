import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PasswordService } from './password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

// TODO: Adicionar guard quando tivermos autenticação
// @UseGuards(JwtAuthGuard)
const TEMP_USER_ID = '42f4ab74-95e4-4748-b409-6b8610a8d182';

@ApiTags('password')
@ApiBearerAuth()
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('change')
  @ApiOperation({ summary: 'Alterar senha do utilizador autenticado' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Senha atual inválida' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.passwordService.changePassword(changePasswordDto, TEMP_USER_ID);
  }

  @Post('forgot')
  @ApiOperation({ summary: 'Esqueci a senha - gera senha temporária' })
  @ApiResponse({ status: 200, description: 'Senha temporária enviada' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto);
  }
}
