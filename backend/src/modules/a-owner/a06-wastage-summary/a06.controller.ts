import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A06Service } from './a06.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A06 — Wastage Summary
 *
 * Aggregates all kitchen and inventory wastage entries with cost impact, item breakdown, and trend.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a06/
 */
@ApiTags('A06 - Wastage Summary')
@ApiBearerAuth()
@Controller('api/owner/wastage')
export class A06Controller {
  constructor(private readonly service: A06Service) {}

  /** GET /api/owner/wastage — Wastage summary by date range */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/wastage/items — Per-item wastage totals */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/wastage/trend — Daily wastage trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
