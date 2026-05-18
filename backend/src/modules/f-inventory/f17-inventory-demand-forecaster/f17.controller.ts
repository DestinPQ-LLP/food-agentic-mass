import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F17Service } from './f17.service';
import { UpdateF17Dto } from './dto/update-f17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F17 — Inventory Demand Forecaster
 *
 * Predicts how much of each material to procure based on sales forecast and current stock.
 *
 * Category: Inventory  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f17/
 */
@ApiTags('F17 - Inventory Demand Forecaster')
@ApiBearerAuth()
@Controller('api/inventory/forecast')
export class F17Controller {
  constructor(private readonly service: F17Service) {}

  /** GET /api/inventory/forecast/procurement — Recommended procurement quantities */
  @Get('procurement')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getProcurement(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/forecast/items — Per-item demand forecast */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/inventory/forecast/settings — Configure forecast horizon */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateF17Dto) {
    // TODO (F17): implement PUT /api/inventory/forecast/settings — Configure forecast horizon
        return { ok: true, endpoint: 'api/inventory/forecast/settings', args: { dto } };
  }
}
