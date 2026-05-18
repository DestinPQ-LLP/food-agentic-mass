import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N04Service } from './n04.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N04 — Cross-Branch Inventory View
 *
 * Consolidated view of stock levels across all outlets to identify surpluses and shortfalls.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n04/
 */
@ApiTags('N04 - Cross-Branch Inventory View')
@ApiBearerAuth()
@Controller('api/branches/inventory')
export class N04Controller {
  constructor(private readonly service: N04Service) {}

  /** GET /api/branches/inventory/consolidated — Inventory across all branches */
  @Get('consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/inventory/low-stock — Low stock across branches */
  @Get('low-stock')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLowStock(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/inventory/compare — Branch-wise stock comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
