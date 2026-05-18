import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L11Service } from './l11.service';
import { CreateL11Dto } from './dto/create-l11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L11 — CCTV Health Monitor
 *
 * Monitors camera connectivity and alerts when a camera goes offline.
 *
 * Category: CCTV  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l11/
 */
@ApiTags('L11 - CCTV Health Monitor')
@ApiBearerAuth()
@Controller('api/cctv/health')
export class L11Controller {
  constructor(private readonly service: L11Service) {}

  /** GET /api/cctv/health — Health status of all cameras */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/cctv/health/offline — Offline cameras */
  @Get('offline')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOffline(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/cctv/health/alert/send — Send offline alert */
  @Post('alert/send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAlertSend(@Body() dto: CreateL11Dto) {
    return this.service.create(dto);
  }
}
