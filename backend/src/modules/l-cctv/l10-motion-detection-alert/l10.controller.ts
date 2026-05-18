import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L10Service } from './l10.service';
import { UpdateL10Dto } from './dto/update-l10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L10 — Motion Detection Alert
 *
 * Alerts when motion is detected during configured off-hours or in restricted areas.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l10/
 */
@ApiTags('L10 - Motion Detection Alert')
@ApiBearerAuth()
@Controller('api/cctv/motion')
export class L10Controller {
  constructor(private readonly service: L10Service) {}

  /** GET /api/cctv/motion/alerts — Motion detection alerts */
  @Get('alerts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAlerts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/motion/settings — Configure motion zones and hours */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateL10Dto) {
    // TODO (L10): implement PUT /api/cctv/motion/settings — Configure motion zones and hours
        return { ok: true, endpoint: 'api/cctv/motion/settings', args: { dto } };
  }

  /** GET /api/cctv/motion/log — Motion alert history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
