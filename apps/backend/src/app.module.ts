import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CategoryModule } from './presentation/modules/business/category/category.module';
import { SystemModule } from './presentation/modules/system/system.module';
import { ProductModule } from './presentation/modules/business/product/product.module';
import { AuthModule } from './presentation/modules/identity/auth/auth.module';
import { AccountModule } from './presentation/modules/identity/account/account.module';
import { PasswordModule } from './presentation/modules/identity/password/password.module';
import { PermissionModule } from './presentation/modules/identity/permission/permission.module';

@Module({
  imports: [PrismaModule, CategoryModule, SystemModule, ProductModule, AuthModule, AccountModule, PasswordModule, PermissionModule],
})
export class AppModule {}
