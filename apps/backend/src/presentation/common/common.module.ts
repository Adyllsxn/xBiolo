import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

@Module({
  providers: [ValidationPipe, GlobalExceptionFilter],
  exports: [ValidationPipe, GlobalExceptionFilter],
})
export class CommonModule {}
