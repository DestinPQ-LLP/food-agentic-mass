import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L13Service } from './l13.service';
import { CreateL13Dto } from './dto/create-l13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L13 — Incident Clip Saver
 *
 * Saves a clip from around the time of an incident for later review or evidence.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l13/
 */
@ApiTags('L13 - Incident Clip Saver')
@ApiBearerAuth()
@Controller('api/cctv/clips')
export class L13Controller {
  constructor(private readonly service: L13Service) {}

  /** POST /api/cctv/clips/save — Save clip for time range */
  @Post('save')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSave(@Body() dto: CreateL13Dto) {
    return this.service.create(dto);
  }

  /** GET /api/cctv/clips — List saved clips */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/clips/:id/download — Download clip */
  @Get(':id/download')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdDownload(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
