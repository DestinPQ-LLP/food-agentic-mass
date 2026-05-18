import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B14Service } from './b14.service';
import { UpdateB14Dto } from './dto/update-b14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B14 — Pending Orders Queue
 *
 * Live view of all orders that are open or partially prepared so nothing is missed during busy hours.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b14/
 */
@ApiTags('B14 - Pending Orders Queue')
@ApiBearerAuth()
@Controller('api/pos/orders')
export class B14Controller {
  constructor(private readonly service: B14Service) {}

  /** GET /api/pos/orders/pending — All pending orders */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/pos/orders/:id/priority — Flag as priority */
  @Put(':id/priority')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdPriority(@Param('id') id: string, @Body() dto: UpdateB14Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/pos/orders/pending/count — Count of pending orders */
  @Get('pending/count')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPendingCount(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
