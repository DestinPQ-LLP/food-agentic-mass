import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N06Service } from './n06.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N06 — Branch Performance Comparison
 *
 * Ranks all outlets on revenue, orders, wastage, and customer ratings for benchmarking.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n06/
 */
@ApiTags('N06 - Branch Performance Comparison')
@ApiBearerAuth()
@Controller('api/branches/performance')
export class N06Controller {
  constructor(private readonly service: N06Service) {}

  /** GET /api/branches/performance/compare — Branch performance comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/performance/ranking — Branch ranking by metric */
  @Get('ranking')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRanking(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/performance/gaps — Performance gaps across branches */
  @Get('gaps')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getGaps(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
