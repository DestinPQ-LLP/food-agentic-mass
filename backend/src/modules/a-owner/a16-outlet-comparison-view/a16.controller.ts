import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A16Service } from './a16.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A16 — Outlet Comparison View
 *
 * Side-by-side performance comparison of multiple outlets across key metrics (multi-branch).
 *
 * Category: Owner Centre  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a16/
 */
@ApiTags('A16 - Outlet Comparison View')
@ApiBearerAuth()
@Controller('api/owner/outlet-compare')
export class A16Controller {
  constructor(private readonly service: A16Service) {}

  /** GET /api/owner/outlet-compare — Compare all outlets */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/outlet-compare/:metric — Compare by specific metric */
  @Get(':metric')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByMetric(@Param('metric') metric: string) {
    // TODO (A16): implement GET /api/owner/outlet-compare/:metric — Compare by specific metric
        return { ok: true, endpoint: 'api/owner/outlet-compare/:metric', args: { metric } };
  }

  /** GET /api/owner/outlet-compare/rank — Rank outlets by performance */
  @Get('rank')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRank(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
