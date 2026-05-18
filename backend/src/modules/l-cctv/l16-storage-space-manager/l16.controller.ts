import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L16Service } from './l16.service';
import { CreateL16Dto } from './dto/create-l16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L16 — Storage Space Manager
 *
 * Monitors CCTV storage consumption and alerts when disk space is low.
 *
 * Category: CCTV  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l16/
 */
@ApiTags('L16 - Storage Space Manager')
@ApiBearerAuth()
@Controller('api/cctv/storage')
export class L16Controller {
  constructor(private readonly service: L16Service) {}

  /** GET /api/cctv/storage/status — Storage usage status */
  @Get('status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStatus(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/storage/cameras — Storage per camera */
  @Get('cameras')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCameras(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/cctv/storage/cleanup — Trigger clip cleanup */
  @Post('cleanup')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCleanup(@Body() dto: CreateL16Dto) {
    return this.service.create(dto);
  }
}
