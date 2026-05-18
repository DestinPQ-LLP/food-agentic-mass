import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E11Service } from './e11.service';
import { UpdateE11Dto } from './dto/update-e11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E11 — Rush Hour Alert for Kitchen
 *
 * Notifies kitchen staff when incoming orders surge above a configurable threshold per hour.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e11/
 */
@ApiTags('E11 - Rush Hour Alert for Kitchen')
@ApiBearerAuth()
@Controller('api/kitchen/rush')
export class E11Controller {
  constructor(private readonly service: E11Service) {}

  /** GET /api/kitchen/rush/current — Current orders-per-hour rate */
  @Get('current')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCurrent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/rush/threshold — Set rush threshold */
  @Put('threshold')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateThreshold(@Body() dto: UpdateE11Dto) {
    // TODO (E11): implement PUT /api/kitchen/rush/threshold — Set rush threshold
        return { ok: true, endpoint: 'api/kitchen/rush/threshold', args: { dto } };
  }

  /** GET /api/kitchen/rush/alerts — Rush alert history */
  @Get('alerts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAlerts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
