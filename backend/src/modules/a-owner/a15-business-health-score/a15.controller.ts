import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A15Service } from './a15.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A15 — Business Health Score
 *
 * A single composite score (0–100) aggregating sales performance, wastage, customer satisfaction, and stock health.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a15/
 */
@ApiTags('A15 - Business Health Score')
@ApiBearerAuth()
@Controller('api/owner/health-score')
export class A15Controller {
  constructor(private readonly service: A15Service) {}

  /** GET /api/owner/health-score — Overall health score and components */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/health-score/history — Score trend over time */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/health-score/breakdown — Category-wise scores */
  @Get('breakdown')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBreakdown(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
