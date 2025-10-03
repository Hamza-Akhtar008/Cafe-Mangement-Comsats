import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';

import { Product } from 'src/entities/product.enitity';

@Module({
  imports:[TypeOrmModule.forFeature([Invoice,Product])],
  providers: [InvoicesService],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
