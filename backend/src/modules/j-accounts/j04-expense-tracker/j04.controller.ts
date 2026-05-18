import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J04Service } from './j04.service';
import { CreateJ04Dto } from './dto/create-j04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J04 — Expense Tracker
 *
 * Records business expenses (utilities, maintenance, packaging, miscellaneous) by category.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j04/
 */
@ApiTags('J04 - Expense Tracker')
@ApiBearerAuth()
@Controller('api/accounts/expenses')
export class J04Controller {
  constructor(private readonly service: J04Service) {}

  /** POST /api/accounts/expenses — Log an expense */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateJ04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/expenses — List expenses */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/expenses/summary — Expense summary by category */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
