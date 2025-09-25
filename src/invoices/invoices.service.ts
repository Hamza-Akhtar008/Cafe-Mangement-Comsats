import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from 'src/entities/invoice-item.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.enitity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(manager: User, items: { productId: number; quantity: number }[]) {
    let total = 0;
    const invoiceItems: InvoiceItem[] = [];

    for (const it of items) {
      const product = await this.productRepo.findOneBy({ id: it.productId });
      if (!product) throw new Error(`Product ${it.productId} not found`);

      const subtotal = Number(product.price) * it.quantity;
      total += subtotal;

      const item = this.itemRepo.create({
        product,
        quantity: it.quantity,
        price: product.price,
        subtotal,
      });
      invoiceItems.push(item);
    }

    const invoice = this.invoiceRepo.create({
      manager,
      totalAmount: total,
      items: invoiceItems,
    });

    return this.invoiceRepo.save(invoice);
  }

  findAll() {
    return this.invoiceRepo.find({ relations: ['items', 'manager'] });
  }
}
