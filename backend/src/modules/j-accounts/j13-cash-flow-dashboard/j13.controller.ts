import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J13Service } from './j13.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J13 — Cash Flow Dashboard
 *
 * Shows cash inflows and outflows over time: daily, weekly, and monthly.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j13/
 */
@ApiTags('J13 - Cash Flow Dashboard')
@ApiBearerAuth()
@Controller('api/accounts/cashflow')
export class J13Controller {
  constructor(private readonly service: J13Service) {}

  /** GET /api/accounts/cashflow — Cash flow data for period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/cashflow/projection — 30-day cash flow projection */
  @Get('projection')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getProjection(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/cashflow/categories — Cash flow by category */
  @Get('categories')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCategories(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
