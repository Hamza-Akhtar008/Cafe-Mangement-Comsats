// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentMethod } from 'src/entities/payment.entity';
import { Invoice } from 'src/entities/invoice.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}

  async create(invoiceId: number, method: PaymentMethod, amount: number) {
    const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const payment = this.paymentRepo.create({ method, amount, invoice });
    return this.paymentRepo.save(payment);
  }

  async findByInvoice(invoiceId: number) {
    return this.paymentRepo.find({
      where: { invoice: { id: invoiceId } },
      relations: ['invoice'],
    });
  }
}
