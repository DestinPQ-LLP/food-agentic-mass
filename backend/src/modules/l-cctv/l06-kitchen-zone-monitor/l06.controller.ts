import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L06Service } from './l06.service';
import { UpdateL06Dto } from './dto/update-l06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L06 — Kitchen Zone Monitor
 *
 * Dedicated live view of the kitchen camera for remote monitoring of production activity.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l06/
 */
@ApiTags('L06 - Kitchen Zone Monitor')
@ApiBearerAuth()
@Controller('api/cctv/zones/kitchen')
export class L06Controller {
  constructor(private readonly service: L06Service) {}

  /** GET /api/cctv/zones/kitchen/stream — Kitchen camera stream URL */
  @Get('stream')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStream(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/zones/kitchen/events — Kitchen zone events */
  @Get('events')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getEvents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/zones/kitchen/camera — Configure kitchen camera */
  @Put('camera')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateCamera(@Body() dto: UpdateL06Dto) {
    // TODO (L06): implement PUT /api/cctv/zones/kitchen/camera — Configure kitchen camera
        return { ok: true, endpoint: 'api/cctv/zones/kitchen/camera', args: { dto } };
  }
}
