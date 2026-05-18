import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K18Service } from './k18.service';
import { UpdateK18Dto } from './dto/update-k18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K18 — Delivery SLA Report
 *
 * Tracks performance against delivery time SLAs: on-time vs late by zone and agent.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k18/
 */
@ApiTags('K18 - Delivery SLA Report')
@ApiBearerAuth()
@Controller('api/delivery/sla')
export class K18Controller {
  constructor(private readonly service: K18Service) {}

  /** GET /api/delivery/sla/report — SLA compliance report */
  @Get('report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/sla/breaches — SLA breach list */
  @Get('breaches')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBreaches(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/sla/settings — Set SLA targets */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateK18Dto) {
    // TODO (K18): implement PUT /api/delivery/sla/settings — Set SLA targets
        return { ok: true, endpoint: 'api/delivery/sla/settings', args: { dto } };
  }
}
