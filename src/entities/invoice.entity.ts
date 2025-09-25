import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';


import { User } from './user.entity';
import { InvoiceItem } from './invoice-item.entity';
import { Payment } from './payment.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.invoices, { eager: true })
  manager: User; // The manager who made the sale

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // 👈 Add this
  date: string;
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Payment, (payment) => payment.invoice)
payments: Payment[];
}
