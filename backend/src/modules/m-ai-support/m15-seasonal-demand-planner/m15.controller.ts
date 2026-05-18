import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M15Service } from './m15.service';
import { CreateM15Dto } from './dto/create-m15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M15 — Seasonal Demand Planner
 *
 * Models how festivals, school holidays, and weather seasons affect demand.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m15/
 */
@ApiTags('M15 - Seasonal Demand Planner')
@ApiBearerAuth()
@Controller('api/ai/seasonal')
export class M15Controller {
  constructor(private readonly service: M15Service) {}

  /** GET /api/ai/seasonal/forecast — Seasonal demand adjustments */
  @Get('forecast')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getForecast(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/ai/seasonal/events — Add custom event/season */
  @Post('events')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEvents(@Body() dto: CreateM15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/seasonal/calendar — Seasonal events calendar */
  @Get('calendar')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCalendar(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
