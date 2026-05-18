import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L17Service } from './l17.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L17 — CCTV Analytics Report
 *
 * Aggregated weekly/monthly report of footfall, peak periods, and event counts.
 *
 * Category: CCTV  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l17/
 */
@ApiTags('L17 - CCTV Analytics Report')
@ApiBearerAuth()
@Controller('api/cctv/analytics')
export class L17Controller {
  constructor(private readonly service: L17Service) {}

  /** GET /api/cctv/analytics/report — CCTV analytics report for period */
  @Get('report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/analytics/footfall — Footfall analytics */
  @Get('footfall')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFootfall(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/analytics/events — Event frequency analytics */
  @Get('events')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getEvents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
