import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async create(description: string, amount: number, category?: string, date?: string) {
    const expense = this.expenseRepo.create({
      description,
      amount,
      category,
      date: date || new Date().toISOString().split('T')[0],
    });
    return this.expenseRepo.save(expense);
  }

  async findByDate(date: string) {
    return this.expenseRepo.find({ where: { date } });
  }

  async findToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.findByDate(today);
  }
}