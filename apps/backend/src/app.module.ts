import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
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
    ThrottlerModule.forRoot([
      {
        name: 'login',
        ttl: 120000,
        limit: 3,
      },
      {
        name: 'default',
        ttl: 60000,
        limit: 10,
      },
    ]),
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
