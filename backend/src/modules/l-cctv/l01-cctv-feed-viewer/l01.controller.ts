import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L01Service } from './l01.service';
import { UpdateL01Dto } from './dto/update-l01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L01 — CCTV Feed Viewer
 *
 * Live camera feed viewer embedded in the dashboard for owner/manager monitoring.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l01/
 */
@ApiTags('L01 - CCTV Feed Viewer')
@ApiBearerAuth()
@Controller('api/cctv/cameras')
export class L01Controller {
  constructor(private readonly service: L01Service) {}

  /** GET /api/cctv/cameras — List connected cameras */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/cameras/:id/stream — Stream URL for camera */
  @Get(':id/stream')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdStream(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** PUT /api/cctv/cameras/:id/settings — Camera settings */
  @Put(':id/settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdSettings(@Param('id') id: string, @Body() dto: UpdateL01Dto) {
    return this.service.update(id, dto);
  }
}
