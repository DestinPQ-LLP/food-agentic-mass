import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B12Service } from './b12.service';
import { UpdateB12Dto } from './dto/update-b12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B12 — Dine-in vs Takeaway Tagger
 *
 * Tags each order as dine-in, takeaway, or parcel so kitchen and packaging team can act accordingly.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b12/
 */
@ApiTags('B12 - Dine-in vs Takeaway Tagger')
@ApiBearerAuth()
@Controller('api/pos')
export class B12Controller {
  constructor(private readonly service: B12Service) {}

  /** PUT /api/pos/orders/:id/type — Set order type */
  @Put('orders/:id/type')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateOrdersByIdType(@Param('id') id: string, @Body() dto: UpdateB12Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/pos/orders/by-type — Orders grouped by type */
  @Get('orders/by-type')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOrdersByType(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/analytics/order-types — Order type mix analytics */
  @Get('analytics/order-types')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAnalyticsOrderTypes(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
