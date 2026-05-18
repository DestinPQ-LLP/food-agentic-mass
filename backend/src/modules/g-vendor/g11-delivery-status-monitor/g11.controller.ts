import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G11Service } from './g11.service';
import { UpdateG11Dto } from './dto/update-g11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G11 — Delivery Status Monitor
 *
 * Tracks expected vs actual delivery dates for each PO line item.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g11/
 */
@ApiTags('G11 - Delivery Status Monitor')
@ApiBearerAuth()
@Controller('api/vendors/purchase-orders')
export class G11Controller {
  constructor(private readonly service: G11Service) {}

  /** PUT /api/vendors/purchase-orders/:id/delivery — Update delivery status */
  @Put(':id/delivery')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdDelivery(@Param('id') id: string, @Body() dto: UpdateG11Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/vendors/purchase-orders/overdue — Overdue deliveries */
  @Get('overdue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOverdue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/purchase-orders/expected-today — Expected deliveries today */
  @Get('expected-today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExpectedToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
