import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N09Service } from './n09.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N09 — Consolidated P&L Report
 *
 * Combined Profit & Loss across all branches with branch-level drill-down.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n09/
 */
@ApiTags('N09 - Consolidated P&L Report')
@ApiBearerAuth()
@Controller('api/branches/pnl')
export class N09Controller {
  constructor(private readonly service: N09Service) {}

  /** GET /api/branches/pnl/consolidated — Consolidated P&L for period */
  @Get('consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/pnl/:branchId — Branch-level P&L */
  @Get(':branchId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByBranchId(@Param('branchId') branchId: string) {
    // TODO (N09): implement GET /api/branches/pnl/:branchId — Branch-level P&L
        return { ok: true, endpoint: 'api/branches/pnl/:branchId', args: { branchId } };
  }

  /** GET /api/branches/pnl/compare — Branch P&L comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
