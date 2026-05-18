import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J05Service } from './j05.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J05 — Profit & Loss Statement
 *
 * Formal P&L for any date range: revenue, COGS, operating expenses, and net profit.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j05/
 */
@ApiTags('J05 - Profit & Loss Statement')
@ApiBearerAuth()
@Controller('api/accounts/pnl')
export class J05Controller {
  constructor(private readonly service: J05Service) {}

  /** GET /api/accounts/pnl — P&L statement for period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/pnl/monthly — Monthly P&L trend */
  @Get('monthly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getMonthly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/pnl/export — Export P&L as PDF */
  @Get('export')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
