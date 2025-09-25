import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'general' })
  category: string; // rent, salaries, ingredients etc.

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: string; // ensures it’s saved as daily expense

  @CreateDateColumn()
  createdAt: Date;
}
