import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';


;

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UserRole } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/guard/roles.decorator';

@ApiTags('Invoices')
@ApiBearerAuth('access-token') // Swagger shows lock icon for JWT
@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()

  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  create(@Req() req, @Body() body: CreateInvoiceDto) {
    return this.invoicesService.create(req.user, body.items);
  }

  @Get()

  @ApiResponse({ status: 200, description: 'List of all invoices' })
  findAll() {
    return this.invoicesService.findAll();
  }
}
