import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Payment } from './payment.entity';
import { Product } from './product.enitity';

// Define the embedded InvoiceItem class
class InvoiceItem {
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.invoices, { eager: true })
  manager: User;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];

  // Store InvoiceItem as a JSON array
  @Column('json')
  items: InvoiceItem[];
}
