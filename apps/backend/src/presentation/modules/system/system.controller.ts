import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('info')
  @ApiOperation({
    summary: 'Informações do Sistema',
    description: 'Retorna informações sobre a API, servidor e uso de memória',
  })
  @ApiResponse({
    status: 200,
    description: 'Informações obtidas com sucesso',
    schema: {
      example: {
        application: 'Biolo API',
        version: '1.0.0',
        description: 'Catálogo digital com finalização no WhatsApp',
        environment: 'development',
        server: 'parrot',
        timestamp: '2026-04-13T12:00:00.000Z',
        uptime: '0d 0h 5m',
        memoryUsage: '147.06 MB',
      },
    },
  })
  getSystemInfo() {
    return this.systemService.getSystemInfo();
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Verifica o status da API e conexão com o banco de dados',
  })
  @ApiResponse({ status: 200, description: 'Sistema saudável' })
  @ApiResponse({ status: 503, description: 'Sistema não saudável' })
  async getHealth() {
    return this.systemService.getHealth();
  }
}
