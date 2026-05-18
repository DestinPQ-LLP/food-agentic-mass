import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E01Service } from './e01.service';
import { UpdateE01Dto } from './dto/update-e01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E01 — Kitchen Display System
 *
 * Live screen for kitchen staff showing all active orders with item details and status buttons.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e01/
 */
@ApiTags('E01 - Kitchen Display System')
@ApiBearerAuth()
@Controller('api/kitchen/orders')
export class E01Controller {
  constructor(private readonly service: E01Service) {}

  /** GET /api/kitchen/orders/live — Live order queue for kitchen */
  @Get('live')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/orders/:id/status — Update order status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateE01Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/orders/live/count — Count of live orders */
  @Get('live/count')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLiveCount(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
