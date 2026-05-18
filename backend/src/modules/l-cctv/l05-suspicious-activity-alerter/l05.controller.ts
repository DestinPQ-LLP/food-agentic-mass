import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L05Service } from './l05.service';
import { UpdateL05Dto } from './dto/update-l05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L05 — Suspicious Activity Alerter
 *
 * Sends alert when unusual activity is detected outside hours or in restricted zones.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l05/
 */
@ApiTags('L05 - Suspicious Activity Alerter')
@ApiBearerAuth()
@Controller('api/cctv/alerts')
export class L05Controller {
  constructor(private readonly service: L05Service) {}

  /** GET /api/cctv/alerts/suspicious — Suspicious activity alerts */
  @Get('suspicious')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSuspicious(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/alerts/settings — Configure alert zones and hours */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateL05Dto) {
    // TODO (L05): implement PUT /api/cctv/alerts/settings — Configure alert zones and hours
        return { ok: true, endpoint: 'api/cctv/alerts/settings', args: { dto } };
  }

  /** GET /api/cctv/alerts/log — Alert history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
