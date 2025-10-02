import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';

;

import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/guard/roles.decorator';

@ApiTags('reports')
 // tells Swagger that this controller requires JWT Bearer token
@Controller('reports')
@ApiBearerAuth('access-token')

export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  
  @Get('daily')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  
  @ApiOperation({ summary: 'Get daily sales, expenses, and profit' })
  @ApiQuery({ 
    name: 'date', 
    required: false, 
    type: String, 
    description: 'Date in YYYY-MM-DD format. Defaults to today if not provided.' 
  })

  getDaily(@Req() req, @Query('date') date?: string) {
    console.log('Reached controller!', req.user);
    const reportDate = date ?? new Date().toISOString().split('T')[0];
    return { date: reportDate, user: req.user, report: 'dummy report data' };
  }
}
