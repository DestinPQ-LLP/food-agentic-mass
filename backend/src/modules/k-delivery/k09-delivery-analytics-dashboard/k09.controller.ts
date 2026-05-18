import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K09Service } from './k09.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K09 — Delivery Analytics Dashboard
 *
 * Metrics: on-time rate, average delivery time, agent performance, and zone-wise volume.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k09/
 */
@ApiTags('K09 - Delivery Analytics Dashboard')
@ApiBearerAuth()
@Controller('api/delivery/analytics')
export class K09Controller {
  constructor(private readonly service: K09Service) {}

  /** GET /api/delivery/analytics — Delivery analytics for period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/analytics/agents — Agent performance analytics */
  @Get('agents')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAgents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/analytics/zones — Zone-wise delivery analytics */
  @Get('zones')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getZones(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
