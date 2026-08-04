import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CollectionsModule } from './collections/collection.module';
import { LogModule } from './logs/log.module';
import { ModelsModule } from './model/model.module';
import { ProductsModule } from './products/product.module';
import { SalesModule } from './sales/sale.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LogModule,
    CollectionsModule,
    ModelsModule,
    ProductsModule,
    SalesModule
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes();
  }
}
