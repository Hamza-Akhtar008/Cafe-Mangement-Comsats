import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expense.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

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
  const targetDate = date ? new Date(date) : new Date();

  // Normalize targetDate to midnight (start of the day)
  targetDate.setHours(0, 0, 0, 0);

  // Set end of the day (23:59:59) for better date range comparison
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  console.log("SERVICE....");
  console.log("Start of Day:", targetDate);
  console.log("End of Day:", endOfDay);

  // Sales - Get all invoices (no date filter in the query)
  const invoices = await this.invoiceRepo.find({
    relations: ['payments'],
  });

  // Manually filter invoices by the date range
  const filteredInvoices = invoices.filter((inv) => {
    const invoiceDate = new Date(inv.createdAt);
    return invoiceDate >= targetDate && invoiceDate <= endOfDay;
  });
  console.log(filteredInvoices);

  // Calculate total sales
  const totalSales = filteredInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);

  // Expenses - Get all expenses (no date filter in the query)
  const expenses = await this.expenseRepo.find();

  // Manually filter expenses by the date
  const filteredExpenses = expenses.filter((exp) => {
    const expenseDate = new Date(exp.date);
    return expenseDate >= targetDate && expenseDate <= endOfDay;
  });
  console.log(filteredExpenses);

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  console.log({
    date: targetDate,
    totalSales,
    totalExpenses,
    profit: totalSales - totalExpenses,
  });

  return {
    date: targetDate,
    totalSales,
    totalExpenses,
    profit: totalSales - totalExpenses,
  };
}


}
