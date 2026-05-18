import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L04Service } from './l04.service';
import { UpdateL04Dto } from './dto/update-l04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L04 — Peak Hour Detector
 *
 * Automatically identifies peak periods from footfall data and highlights them for planning.
 *
 * Category: CCTV  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l04/
 */
@ApiTags('L04 - Peak Hour Detector')
@ApiBearerAuth()
@Controller('api/cctv/peaks')
export class L04Controller {
  constructor(private readonly service: L04Service) {}

  /** GET /api/cctv/peaks/today — Today's detected peak periods */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/peaks/weekly — Weekly peak pattern */
  @Get('weekly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getWeekly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/peaks/settings — Configure peak threshold */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateL04Dto) {
    // TODO (L04): implement PUT /api/cctv/peaks/settings — Configure peak threshold
        return { ok: true, endpoint: 'api/cctv/peaks/settings', args: { dto } };
  }
}
