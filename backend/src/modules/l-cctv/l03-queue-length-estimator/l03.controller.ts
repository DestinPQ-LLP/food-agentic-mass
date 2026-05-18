import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L03Service } from './l03.service';
import { UpdateL03Dto } from './dto/update-l03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L03 — Queue Length Estimator
 *
 * Estimates current queue size at the counter from camera analysis.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l03/
 */
@ApiTags('L03 - Queue Length Estimator')
@ApiBearerAuth()
@Controller('api/cctv/queue')
export class L03Controller {
  constructor(private readonly service: L03Service) {}

  /** GET /api/cctv/queue/current — Current queue length estimate */
  @Get('current')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCurrent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/queue/trend — Queue length over time today */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/queue/camera — Set queue camera */
  @Put('camera')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateCamera(@Body() dto: UpdateL03Dto) {
    // TODO (L03): implement PUT /api/cctv/queue/camera — Set queue camera
        return { ok: true, endpoint: 'api/cctv/queue/camera', args: { dto } };
  }
}
