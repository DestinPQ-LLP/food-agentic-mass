import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F14Service } from './f14.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F14 — Shrinkage & Loss Report
 *
 * Reports unaccounted stock reduction (shrinkage) not explained by consumption, sales, or wastage.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f14/
 */
@ApiTags('F14 - Shrinkage & Loss Report')
@ApiBearerAuth()
@Controller('api/inventory/shrinkage')
export class F14Controller {
  constructor(private readonly service: F14Service) {}

  /** GET /api/inventory/shrinkage/report — Shrinkage report for period */
  @Get('report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/shrinkage/items — Items with highest shrinkage */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/shrinkage/trend — Shrinkage trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
