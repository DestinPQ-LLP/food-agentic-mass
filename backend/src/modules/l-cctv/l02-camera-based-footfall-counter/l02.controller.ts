import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L02Service } from './l02.service';
import { UpdateL02Dto } from './dto/update-l02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L02 — Camera-Based Footfall Counter
 *
 * Uses computer vision to count customers entering the store from camera feed.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l02/
 */
@ApiTags('L02 - Camera-Based Footfall Counter')
@ApiBearerAuth()
@Controller('api/cctv/footfall')
export class L02Controller {
  constructor(private readonly service: L02Service) {}

  /** GET /api/cctv/footfall/live — Live footfall count */
  @Get('live')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/footfall/hourly — Hourly footfall data */
  @Get('hourly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHourly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/footfall/camera — Configure counting camera */
  @Put('camera')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateCamera(@Body() dto: UpdateL02Dto) {
    // TODO (L02): implement PUT /api/cctv/footfall/camera — Configure counting camera
        return { ok: true, endpoint: 'api/cctv/footfall/camera', args: { dto } };
  }
}
