import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L12Service } from './l12.service';
import { UpdateL12Dto } from './dto/update-l12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L12 — Multi-Camera Dashboard
 *
 * Side-by-side view of all camera feeds in a single responsive grid.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l12/
 */
@ApiTags('L12 - Multi-Camera Dashboard')
@ApiBearerAuth()
@Controller('api/cctv/cameras')
export class L12Controller {
  constructor(private readonly service: L12Service) {}

  /** GET /api/cctv/cameras/streams — All camera stream URLs */
  @Get('streams')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStreams(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/cctv/cameras/grid-layout — Save grid layout */
  @Put('grid-layout')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateGridLayout(@Body() dto: UpdateL12Dto) {
    // TODO (L12): implement PUT /api/cctv/cameras/grid-layout — Save grid layout
        return { ok: true, endpoint: 'api/cctv/cameras/grid-layout', args: { dto } };
  }

  /** GET /api/cctv/cameras/grid-layout — Get saved grid layout */
  @Get('grid-layout')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getGridLayout(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
