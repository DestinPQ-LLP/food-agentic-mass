import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L14Service } from './l14.service';
import { UpdateL14Dto } from './dto/update-l14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L14 — After-Hours Alert
 *
 * Sends an immediate WhatsApp alert if any entry is detected after store closing time.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l14/
 */
@ApiTags('L14 - After-Hours Alert')
@ApiBearerAuth()
@Controller('api/cctv/after-hours')
export class L14Controller {
  constructor(private readonly service: L14Service) {}

  /** GET /api/cctv/after-hours/alerts — After-hours alerts */
  @Get('alerts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAlerts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/after-hours/settings — Set closing time and alert recipient */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateL14Dto) {
    // TODO (L14): implement PUT /api/cctv/after-hours/settings — Set closing time and alert recipient
        return { ok: true, endpoint: 'api/cctv/after-hours/settings', args: { dto } };
  }

  /** GET /api/cctv/after-hours/log — Alert history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
