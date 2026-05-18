import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B07Service } from './b07.service';
import { CreateB07Dto } from './dto/create-b07.dto';
import { UpdateB07Dto } from './dto/update-b07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B07 — Order Edit & Cancellation
 *
 * Allows authorised staff to edit items on an order or cancel it before or after billing, with reason logging.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b07/
 */
@ApiTags('B07 - Order Edit & Cancellation')
@ApiBearerAuth()
@Controller('api/pos/orders')
export class B07Controller {
  constructor(private readonly service: B07Service) {}

  /** PUT /api/pos/orders/:id/edit — Edit order items */
  @Put(':id/edit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdEdit(@Param('id') id: string, @Body() dto: UpdateB07Dto) {
    return this.service.update(id, dto);
  }

  /** POST /api/pos/orders/:id/cancel — Cancel order with reason */
  @Post(':id/cancel')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdCancel(@Param('id') id: string, @Body() dto: CreateB07Dto) {
    // TODO (B07): implement POST /api/pos/orders/:id/cancel — Cancel order with reason
        return { ok: true, endpoint: 'api/pos/orders/:id/cancel', args: { id, dto } };
  }

  /** GET /api/pos/orders/cancelled — List cancelled orders today */
  @Get('cancelled')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCancelled(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
