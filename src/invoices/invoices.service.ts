import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityManager, In } from 'typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { Product } from 'src/entities/product.enitity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

async create(manager: User, items: { productId: number; quantity: number }[]) {
  console.log("Items received:", items);
  let total = 0;
console.log(manager);
  // Explicitly define the type of invoiceItems array
  const invoiceItems: { product: Product; quantity: number; price: number; subtotal: number }[] = [];

  try {
    // Fetch all products at once to avoid multiple queries
    const productIds = items.map(it => it.productId);
    const products = await this.invoiceRepo.manager.find(Product, { where: { id: In(productIds) } });

    // Map productId to Product for easy access
    const productMap = new Map(products.map(product => [product.id, product]));

    // Iterate through the items, calculate subtotal and populate invoice items
    for (const it of items) {
      const product = productMap.get(it.productId);
      if (!product) {
        throw new Error(`Product with id ${it.productId} not found`);
      }

      const price = Number(product.price); // Ensure price is a number
      const subtotal = price * it.quantity;
      total += subtotal;

      // Create the invoice item (now it's just an object within the Invoice)
      const item = {
        product,
        quantity: it.quantity,
        price,
        subtotal,
      };

      // Add the item to the array
      invoiceItems.push(item);
    }

    console.log("Invoice Items to be saved:", invoiceItems);

    // Create the invoice object with the total amount and associated items
    const invoice = this.invoiceRepo.create({
      manager,
      totalAmount: total,
      items: invoiceItems,  // Add the embedded InvoiceItems as an array
    });
console.log(invoice);
    // Save the invoice (InvoiceItem is embedded as part of Invoice)
    await this.invoiceRepo.save(invoice); // Save the invoice directly

    console.log("Invoice created successfully:", invoice);
    return invoice;
  } catch (error) {
    // Handle the error
    console.error("Error occurred during invoice creation:", error);
    throw error;
  }
}



  // Find all invoices with their associated items and manager
  findAll() {
    return this.invoiceRepo.find({ relations: ['manager','payments'] });  // No need for 'items' as they are embedded as JSON
  }
}
