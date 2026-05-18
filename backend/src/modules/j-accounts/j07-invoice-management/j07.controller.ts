import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J07Service } from './j07.service';
import { CreateJ07Dto } from './dto/create-j07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J07 — Invoice Management
 *
 * Creates, manages, and archives sales invoices and vendor invoices.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j07/
 */
@ApiTags('J07 - Invoice Management')
@ApiBearerAuth()
@Controller('api/accounts/invoices')
export class J07Controller {
  constructor(private readonly service: J07Service) {}

  /** POST /api/accounts/invoices — Create invoice */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateJ07Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/invoices — List invoices */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/invoices/:id/pdf — Download invoice PDF */
  @Get(':id/pdf')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdPdf(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
