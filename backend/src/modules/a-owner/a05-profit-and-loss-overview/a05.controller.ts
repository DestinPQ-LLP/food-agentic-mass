import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A05Service } from './a05.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A05 — Profit & Loss Overview
 *
 * Calculates revenue minus cost-of-goods and operating expenses to give an estimated P&L for any period.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a05/
 */
@ApiTags('A05 - Profit & Loss Overview')
@ApiBearerAuth()
@Controller('api/owner/pnl')
export class A05Controller {
  constructor(private readonly service: A05Service) {}

  /** GET /api/owner/pnl — P&L for date range */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/pnl/monthly — Month-wise P&L trend */
  @Get('monthly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getMonthly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/pnl/items — Item-level margin breakdown */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
