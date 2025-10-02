import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';





@ApiTags('expenses')
@Controller('expenses')
@ApiBearerAuth('access-token') 
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Add daily expense' })
  create(
    @Body()
    body: { description: string; amount: number; category?: string; date?: string },
  ) {
    return this.expensesService.create(
      body.description,
      body.amount,
      body.category,
      body.date,
    );
  }

  @Get('today')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Get today’s expenses' })
  findToday() {
    return this.expensesService.findToday();
  }

  @Get(':date')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Get expenses for a specific date (YYYY-MM-DD)' })
  findByDate(@Param('date') date: string) {
    return this.expensesService.findByDate(date);
  }
}
