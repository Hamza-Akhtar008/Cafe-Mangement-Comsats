// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Invoice } from 'src/entities/invoice.entity';

import { PaymentController } from './payment.controller';
import { PaymentsService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Invoice])],
  controllers: [PaymentController],
  providers: [PaymentsService],
})
export class PaymentModule {}