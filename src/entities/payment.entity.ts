// src/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

export enum PaymentMethod {
  CASH = 'CASH',
  
  ONLINE = 'ONLINE',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { onDelete: 'CASCADE' })
  invoice: Invoice;

  @CreateDateColumn()
  createdAt: Date;
}
