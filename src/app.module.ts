import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './domain/auth/auth.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { OrdersModule } from './domain/orders/orders.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { ProductsModule } from './domain/products/products.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    DatabaseModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
