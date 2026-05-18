import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F03Service } from './f03.service';
import { CreateF03Dto } from './dto/create-f03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F03 — Closing Stock Entry
 *
 * End-of-day screen for physically counted stock quantities, enabling variance calculation.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f03/
 */
@ApiTags('F03 - Closing Stock Entry')
@ApiBearerAuth()
@Controller('api/inventory/stock')
export class F03Controller {
  constructor(private readonly service: F03Service) {}

  /** POST /api/inventory/stock/closing — Submit closing stock */
  @Post('closing')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClosing(@Body() dto: CreateF03Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/stock/closing/today — Today's closing stock */
  @Get('closing/today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getClosingToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/stock/variance/today — Today's stock variance */
  @Get('variance/today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getVarianceToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
