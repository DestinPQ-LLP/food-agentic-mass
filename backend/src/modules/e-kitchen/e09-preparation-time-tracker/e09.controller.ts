import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E09Service } from './e09.service';
import { CreateE09Dto } from './dto/create-e09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E09 — Preparation Time Tracker
 *
 * Logs the time taken from order receipt to completion, used for performance analytics.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e09/
 */
@ApiTags('E09 - Preparation Time Tracker')
@ApiBearerAuth()
@Controller('api/kitchen/prep-time')
export class E09Controller {
  constructor(private readonly service: E09Service) {}

  /** POST /api/kitchen/prep-time/start — Mark preparation start */
  @Post('start')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createStart(@Body() dto: CreateE09Dto) {
    return this.service.create(dto);
  }

  /** POST /api/kitchen/prep-time/end — Mark preparation complete */
  @Post('end')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEnd(@Body() dto: CreateE09Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/prep-time/analytics — Average prep times by item */
  @Get('analytics')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAnalytics(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
