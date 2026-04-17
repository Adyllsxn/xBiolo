import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CategoryModule } from './presentation/modules/business/category/category.module';
import { SystemModule } from './presentation/modules/system/system.module';
import { CommonModule } from './presentation/common/common.module';
import { ProductModule } from './presentation/modules/business/product/product.module';
import { StoreModule } from './presentation/modules/business/store/store.module';
import { OrderModule } from './presentation/modules/business/order/order.module';
import { AccountModule } from './presentation/modules/identity/account/account.module';
import { PermissionModule } from './presentation/modules/identity/permission/permission.module';
import { PasswordModule } from './presentation/modules/identity/password/password.module';
import { AuthModule } from './presentation/modules/identity/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    SystemModule,
    CommonModule,
    ProductModule,
    StoreModule,
    OrderModule,
    AccountModule,
    PermissionModule,
    PasswordModule,
    AuthModule,
  ],
})
export class AppModule {}
