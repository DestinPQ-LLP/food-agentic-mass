import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F05Service } from './f05.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F05 — Consumption Tracker
 *
 * Tracks raw material consumption mapped from production batches and sales order recipes.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f05/
 */
@ApiTags('F05 - Consumption Tracker')
@ApiBearerAuth()
@Controller('api/inventory/consumption')
export class F05Controller {
  constructor(private readonly service: F05Service) {}

  /** GET /api/inventory/consumption/today — Today's material consumption */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/consumption/items — Per-item consumption totals */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/consumption/trend — Consumption trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
