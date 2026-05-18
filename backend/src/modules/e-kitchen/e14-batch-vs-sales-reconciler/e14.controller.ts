import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E14Service } from './e14.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E14 — Batch vs Sales Reconciler
 *
 * Compares how much was prepared in each batch against how much was actually sold, showing variance.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e14/
 */
@ApiTags('E14 - Batch vs Sales Reconciler')
@ApiBearerAuth()
@Controller('api/kitchen/reconcile')
export class E14Controller {
  constructor(private readonly service: E14Service) {}

  /** GET /api/kitchen/reconcile/batch-vs-sales — Batch vs sales for date */
  @Get('batch-vs-sales')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBatchVsSales(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/reconcile/variance — High variance items */
  @Get('variance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getVariance(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/reconcile/trend — Daily variance trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
