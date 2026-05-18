import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F16Service } from './f16.service';
import { CreateF16Dto } from './dto/create-f16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F16 — Packaging Material Tracker
 *
 * Tracks stock of boxes, bags, cups, and other packaging separately from food ingredients.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f16/
 */
@ApiTags('F16 - Packaging Material Tracker')
@ApiBearerAuth()
@Controller('api/inventory/packaging')
export class F16Controller {
  constructor(private readonly service: F16Service) {}

  /** GET /api/inventory/packaging/stock — Current packaging stock */
  @Get('stock')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStock(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/inventory/packaging/purchase — Log packaging purchase */
  @Post('purchase')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createPurchase(@Body() dto: CreateF16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/packaging/consumption — Packaging consumption by item */
  @Get('consumption')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsumption(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
