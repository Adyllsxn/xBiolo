import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CategoryModule } from './presentation/modules/business/category/category.module';
import { ProductModule } from './presentation/modules/business/product/product.module';
import { AuthModule } from './presentation/modules/identity/auth/auth.module';
import { AccountModule } from './presentation/modules/identity/account/account.module';
import { PasswordModule } from './presentation/modules/identity/password/password.module';
import { PermissionModule } from './presentation/modules/identity/permission/permission.module';
import { SystemModule } from './presentation/modules/system/system.module';

@Module({
  imports: [PrismaModule, CategoryModule, ProductModule, AuthModule, AccountModule, PasswordModule, PermissionModule, SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
