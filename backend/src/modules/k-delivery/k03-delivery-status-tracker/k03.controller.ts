import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K03Service } from './k03.service';
import { UpdateK03Dto } from './dto/update-k03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K03 — Delivery Status Tracker
 *
 * Real-time tracking of delivery order status: dispatched, in-transit, delivered, failed.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k03/
 */
@ApiTags('K03 - Delivery Status Tracker')
@ApiBearerAuth()
@Controller('api/delivery/orders')
export class K03Controller {
  constructor(private readonly service: K03Service) {}

  /** PUT /api/delivery/orders/:id/status — Update delivery status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateK03Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/delivery/orders/:id/timeline — Status timeline for order */
  @Get(':id/timeline')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdTimeline(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/delivery/orders/in-transit — All in-transit orders */
  @Get('in-transit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getInTransit(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
