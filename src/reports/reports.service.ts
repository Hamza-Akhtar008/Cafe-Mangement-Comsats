import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expense.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async getDailyReport(date?: string) {
    // Default = today
    const targetDate = date ?? new Date().toISOString().split('T')[0];

    // Sales
    const invoices = await this.invoiceRepo.find({ where: { date: targetDate } });
    const totalSales = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);

    // Expenses
    const expenses = await this.expenseRepo.find({ where: { date: targetDate } });
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      date: targetDate,
      totalSales,
      totalExpenses,
      profit: totalSales - totalExpenses,
    };
  }
}
