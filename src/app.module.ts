import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import dataSource from 'data-source';
import { APP_GUARD } from '@nestjs/core';

import { PaymentModule } from './payment/payment.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from '@nestjs/config';

import { LocalStrategy } from './auth/strategy/local.strategy';



@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    ProductsModule,
    InvoicesModule,
    PaymentModule,
    ExpensesModule,
    ReportsModule,
  ],
  controllers: [AppController],
   providers: [
    AppService,
    
  ],
})
export class AppModule {}
