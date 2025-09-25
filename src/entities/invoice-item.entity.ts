import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from './product.enitity';


@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  invoice: Invoice;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // snapshot of product price

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}
