import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L08Service } from './l08.service';
import { UpdateL08Dto } from './dto/update-l08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L08 — Security Event Log
 *
 * Chronological log of all CCTV-triggered security events with timestamps and camera references.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l08/
 */
@ApiTags('L08 - Security Event Log')
@ApiBearerAuth()
@Controller('api/cctv/events')
export class L08Controller {
  constructor(private readonly service: L08Service) {}

  /** GET /api/cctv/events — All security events */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/events/:id — Event detail with snapshot */
  @Get(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** PUT /api/cctv/events/:id/acknowledge — Acknowledge event */
  @Put(':id/acknowledge')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdAcknowledge(@Param('id') id: string, @Body() dto: UpdateL08Dto) {
    return this.service.update(id, dto);
  }
}
