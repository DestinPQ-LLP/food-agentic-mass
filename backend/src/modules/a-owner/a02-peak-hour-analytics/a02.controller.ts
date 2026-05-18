import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A02Service } from './a02.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A02 — Peak Hour Analytics
 *
 * Heatmap and trend showing which hours and days have highest customer traffic and order volume.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a02/
 */
@ApiTags('A02 - Peak Hour Analytics')
@ApiBearerAuth()
@Controller('api/owner/peak-hours')
export class A02Controller {
  constructor(private readonly service: A02Service) {}

  /** GET /api/owner/peak-hours — Hourly order heatmap data */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/peak-hours/weekly — Week-on-week peak comparison */
  @Get('weekly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getWeekly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/peak-hours/top — Top 3 peak slots today */
  @Get('top')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTop(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
