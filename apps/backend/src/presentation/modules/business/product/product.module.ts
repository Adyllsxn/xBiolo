import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UploadModule } from 'src/infrastructure/storage/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
