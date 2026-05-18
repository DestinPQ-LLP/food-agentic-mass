import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N17Service } from './n17.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N17 — Multi-Branch Accounts
 *
 * Consolidated accounts view covering revenue, expenses, and P&L across all branches.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n17/
 */
@ApiTags('N17 - Multi-Branch Accounts')
@ApiBearerAuth()
@Controller('api/branches/accounts')
export class N17Controller {
  constructor(private readonly service: N17Service) {}

  /** GET /api/branches/accounts/consolidated — Consolidated accounts */
  @Get('consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/accounts/revenue — Revenue by branch */
  @Get('revenue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRevenue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/accounts/expenses — Expenses by branch */
  @Get('expenses')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExpenses(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
