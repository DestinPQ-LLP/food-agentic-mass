import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N13Service } from './n13.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N13 — Multi-Branch Feedback Dashboard
 *
 * Consolidated quality ratings and complaints across all outlets.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n13/
 */
@ApiTags('N13 - Multi-Branch Feedback Dashboard')
@ApiBearerAuth()
@Controller('api/branches/quality')
export class N13Controller {
  constructor(private readonly service: N13Service) {}

  /** GET /api/branches/quality/consolidated — Quality metrics across branches */
  @Get('consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/quality/compare — Branch quality comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/quality/worst — Branches with worst quality scores */
  @Get('worst')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getWorst(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
