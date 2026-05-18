import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F07Service } from './f07.service';
import { CreateF07Dto } from './dto/create-f07.dto';
import { UpdateF07Dto } from './dto/update-f07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F07 — Low Stock Alert Engine
 *
 * Auto-detects items below reorder level and generates alerts for owner and procurement team.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f07/
 */
@ApiTags('F07 - Low Stock Alert Engine')
@ApiBearerAuth()
@Controller('api/inventory')
export class F07Controller {
  constructor(private readonly service: F07Service) {}

  /** GET /api/inventory/alerts/low-stock — All low-stock alerts */
  @Get('alerts/low-stock')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAlertsLowStock(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/inventory/items/:id/reorder-level — Update reorder level */
  @Put('items/:id/reorder-level')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateItemsByIdReorderLevel(@Param('id') id: string, @Body() dto: UpdateF07Dto) {
    return this.service.update(id, dto);
  }

  /** POST /api/inventory/alerts/low-stock/acknowledge — Acknowledge alert */
  @Post('alerts/low-stock/acknowledge')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAlertsLowStockAcknowledge(@Body() dto: CreateF07Dto) {
    return this.service.create(dto);
  }
}
