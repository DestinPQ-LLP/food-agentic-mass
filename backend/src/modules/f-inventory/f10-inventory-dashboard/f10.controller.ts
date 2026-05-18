import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F10Service } from './f10.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F10 — Inventory Dashboard
 *
 * Overview of current stock levels, low-stock items, recent purchases, and wastage for the owner.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f10/
 */
@ApiTags('F10 - Inventory Dashboard')
@ApiBearerAuth()
@Controller('api/inventory/dashboard')
export class F10Controller {
  constructor(private readonly service: F10Service) {}

  /** GET /api/inventory/dashboard — Full inventory dashboard data */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/dashboard/critical — Critical stock items */
  @Get('critical')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCritical(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/dashboard/summary — Summary KPIs */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
