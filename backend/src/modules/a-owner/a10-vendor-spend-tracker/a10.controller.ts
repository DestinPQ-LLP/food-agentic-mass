import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A10Service } from './a10.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A10 — Vendor Spend Tracker
 *
 * Shows total purchase spend per vendor and per material category across any date range.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a10/
 */
@ApiTags('A10 - Vendor Spend Tracker')
@ApiBearerAuth()
@Controller('api/owner/vendor-spend')
export class A10Controller {
  constructor(private readonly service: A10Service) {}

  /** GET /api/owner/vendor-spend — Spend by vendor and period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/vendor-spend/category — Spend by material category */
  @Get('category')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCategory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/vendor-spend/trend — Monthly spend trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
