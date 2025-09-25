import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Invoice } from 'src/entities/invoice.entity';
import { Expense } from 'src/entities/expense.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Expense])],
  controllers: [ReportsController],
  providers: [ReportsService],
  
})
export class ReportsModule {}
