import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N01Service } from './n01.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N01 — Multi-Branch Dashboard
 *
 * Consolidated owner dashboard showing all outlets' KPIs side-by-side.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n01/
 */
@ApiTags('N01 - Multi-Branch Dashboard')
@ApiBearerAuth()
@Controller('api/branches/dashboard')
export class N01Controller {
  constructor(private readonly service: N01Service) {}

  /** GET /api/branches/dashboard — All branches dashboard data */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/dashboard/kpis — KPI comparison across branches */
  @Get('kpis')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getKpis(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/dashboard/alerts — Cross-branch alerts */
  @Get('alerts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAlerts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
