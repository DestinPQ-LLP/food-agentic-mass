import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M02Service } from './m02.service';
import { CreateM02Dto } from './dto/create-m02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M02 — Demand Forecasting Engine
 *
 * Predicts tomorrow's and next 7 days' item demand using sales history and patterns.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m02/
 */
@ApiTags('M02 - Demand Forecasting Engine')
@ApiBearerAuth()
@Controller('api/ai/forecast')
export class M02Controller {
  constructor(private readonly service: M02Service) {}

  /** GET /api/ai/forecast/demand — Demand forecast for next 7 days */
  @Get('demand')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDemand(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/forecast/items — Item-level demand forecast */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/ai/forecast/override — Apply manual override to forecast */
  @Post('override')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOverride(@Body() dto: CreateM02Dto) {
    return this.service.create(dto);
  }
}
