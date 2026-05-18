import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A14Service } from './a14.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A14 — Revenue Forecasting View
 *
 * Predicts expected revenue for the next 7 days based on historical sales patterns and day-of-week trends.
 *
 * Category: Owner Centre  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a14/
 */
@ApiTags('A14 - Revenue Forecasting View')
@ApiBearerAuth()
@Controller('api/owner/forecast')
export class A14Controller {
  constructor(private readonly service: A14Service) {}

  /** GET /api/owner/forecast/revenue — 7-day revenue forecast */
  @Get('revenue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRevenue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/forecast/items — Forecasted top items */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/forecast/confidence — Forecast confidence scores */
  @Get('confidence')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConfidence(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
