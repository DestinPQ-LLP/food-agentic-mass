import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H05Service } from './h05.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H05 — Rating Trend Dashboard
 *
 * Shows star rating averages by day, item, and shift over a selected date range.
 *
 * Category: Quality  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h05/
 */
@ApiTags('H05 - Rating Trend Dashboard')
@ApiBearerAuth()
@Controller('api/quality/ratings')
export class H05Controller {
  constructor(private readonly service: H05Service) {}

  /** GET /api/quality/ratings/trend — Rating trend data */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/ratings/by-item — Ratings grouped by item */
  @Get('by-item')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByItem(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/ratings/by-shift — Ratings grouped by shift */
  @Get('by-shift')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByShift(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
