import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F09Service } from './f09.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F09 — Stock Variance Report
 *
 * Compares expected stock (opening + purchases - consumption - wastage) against physical closing stock.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f09/
 */
@ApiTags('F09 - Stock Variance Report')
@ApiBearerAuth()
@Controller('api/inventory/variance')
export class F09Controller {
  constructor(private readonly service: F09Service) {}

  /** GET /api/inventory/variance/report — Variance report for date range */
  @Get('report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/variance/high — Items with high variance */
  @Get('high')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHigh(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/variance/trend — Variance trend over time */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
