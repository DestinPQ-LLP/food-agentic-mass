import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L07Service } from './l07.service';
import { UpdateL07Dto } from './dto/update-l07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L07 — Counter Zone Monitor
 *
 * Dedicated view of the billing counter camera.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l07/
 */
@ApiTags('L07 - Counter Zone Monitor')
@ApiBearerAuth()
@Controller('api/cctv/zones/counter')
export class L07Controller {
  constructor(private readonly service: L07Service) {}

  /** GET /api/cctv/zones/counter/stream — Counter camera stream */
  @Get('stream')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStream(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/zones/counter/events — Counter zone events */
  @Get('events')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getEvents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/zones/counter/camera — Configure counter camera */
  @Put('camera')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateCamera(@Body() dto: UpdateL07Dto) {
    // TODO (L07): implement PUT /api/cctv/zones/counter/camera — Configure counter camera
        return { ok: true, endpoint: 'api/cctv/zones/counter/camera', args: { dto } };
  }
}
