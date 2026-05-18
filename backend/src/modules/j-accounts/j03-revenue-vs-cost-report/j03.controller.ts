import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J03Service } from './j03.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J03 — Revenue vs Cost Report
 *
 * Shows gross revenue, estimated COGS, and gross margin for a selected period.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j03/
 */
@ApiTags('J03 - Revenue vs Cost Report')
@ApiBearerAuth()
@Controller('api/accounts/revenue-vs-cost')
export class J03Controller {
  constructor(private readonly service: J03Service) {}

  /** GET /api/accounts/revenue-vs-cost — Revenue and cost for period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/revenue-vs-cost/monthly — Monthly trend */
  @Get('monthly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getMonthly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/revenue-vs-cost/items — Item-level contribution */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
