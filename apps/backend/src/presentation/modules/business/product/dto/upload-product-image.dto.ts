import { ApiProperty } from '@nestjs/swagger';

export class UploadProductImageDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Imagem do produto' })
  file: any;
}