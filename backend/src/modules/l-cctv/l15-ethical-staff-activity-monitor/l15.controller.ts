import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L15Service } from './l15.service';
import { UpdateL15Dto } from './dto/update-l15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L15 — Ethical Staff Activity Monitor
 *
 * Aggregate analytics on counter activity volumes (not individual surveillance); consent-required.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l15/
 */
@ApiTags('L15 - Ethical Staff Activity Monitor')
@ApiBearerAuth()
@Controller('api/cctv/staff-activity')
export class L15Controller {
  constructor(private readonly service: L15Service) {}

  /** GET /api/cctv/staff-activity/summary — Aggregate staff activity analytics */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/staff-activity/settings — Configure monitoring parameters */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateL15Dto) {
    // TODO (L15): implement PUT /api/cctv/staff-activity/settings — Configure monitoring parameters
        return { ok: true, endpoint: 'api/cctv/staff-activity/settings', args: { dto } };
  }

  /** GET /api/cctv/staff-activity/trend — Activity trend */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
