import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E18Service } from './e18.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E18 — Kitchen Analytics Dashboard
 *
 * Aggregated kitchen performance metrics: throughput, wastage, prep times, and error rates.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e18/
 */
@ApiTags('E18 - Kitchen Analytics Dashboard')
@ApiBearerAuth()
@Controller('api/kitchen/analytics')
export class E18Controller {
  constructor(private readonly service: E18Service) {}

  /** GET /api/kitchen/analytics — Kitchen KPIs for date range */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/analytics/items — Item-wise kitchen analytics */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/analytics/trends — Trend data for kitchen KPIs */
  @Get('trends')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrends(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
