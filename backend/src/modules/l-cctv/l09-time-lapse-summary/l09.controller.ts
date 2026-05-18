import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L09Service } from './l09.service';
import { CreateL09Dto } from './dto/create-l09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L09 — Time-Lapse Summary
 *
 * Generates a time-lapse video or snapshot grid summarising a day's activity at the store.
 *
 * Category: CCTV  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l09/
 */
@ApiTags('L09 - Time-Lapse Summary')
@ApiBearerAuth()
@Controller('api/cctv/timelapse')
export class L09Controller {
  constructor(private readonly service: L09Service) {}

  /** POST /api/cctv/timelapse/generate — Generate time-lapse for date */
  @Post('generate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createGenerate(@Body() dto: CreateL09Dto) {
    return this.service.create(dto);
  }

  /** GET /api/cctv/timelapse — List generated time-lapses */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/timelapse/:id/download — Download time-lapse */
  @Get(':id/download')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdDownload(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
