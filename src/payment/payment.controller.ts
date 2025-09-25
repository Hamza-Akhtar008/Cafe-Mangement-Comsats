// src/payments/payments.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PaymentMethod } from 'src/entities/payment.entity';
import { PaymentsService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':invoiceId')
  @ApiOperation({ summary: 'Make a payment for an invoice' })
  create(
    @Param('invoiceId') invoiceId: number,
    @Body() body: { method: PaymentMethod; amount: number },
  ) {
    return this.paymentsService.create(invoiceId, body.method, body.amount);
  }

  @Get(':invoiceId')
  @ApiOperation({ summary: 'Get all payments for an invoice' })
  findByInvoice(@Param('invoiceId') invoiceId: number) {
    return this.paymentsService.findByInvoice(invoiceId);
  }
}
