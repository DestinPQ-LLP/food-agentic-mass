import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F06Service } from './f06.service';
import { CreateF06Dto } from './dto/create-f06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F06 — Wastage & Spoilage Logger
 *
 * Records stock that is wasted or spoiled before use, with item, quantity, and reason.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f06/
 */
@ApiTags('F06 - Wastage & Spoilage Logger')
@ApiBearerAuth()
@Controller('api/inventory/wastage')
export class F06Controller {
  constructor(private readonly service: F06Service) {}

  /** POST /api/inventory/wastage — Log inventory wastage */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF06Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/wastage/today — Today's wastage */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/wastage/items — Wastage totals by item */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
