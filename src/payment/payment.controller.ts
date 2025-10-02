// src/payments/payments.controller.ts
import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { PaymentMethod } from 'src/entities/payment.entity';
import { PaymentsService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRole } from 'src/entities/user.entity';
import { Roles } from 'src/auth/guard/roles.decorator';

@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth('access-token')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':invoiceId')
    @UseGuards(JwtAuthGuard)
  
  @ApiOperation({ summary: 'Make a payment for an invoice' })
  create(
    @Param('invoiceId') invoiceId: number,
    @Body() body: { method: PaymentMethod; amount: number },
  ) {
    return this.paymentsService.create(invoiceId, body.method, body.amount);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':invoiceId')
  @ApiOperation({ summary: 'Get all payments for an invoice' })
  findByInvoice(@Param('invoiceId') invoiceId: number) {
    return this.paymentsService.findByInvoice(invoiceId);
  }
}
