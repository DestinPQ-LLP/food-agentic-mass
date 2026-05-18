import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B04Service } from './b04.service';
import { CreateB04Dto } from './dto/create-b04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B04 — Payment Mode Capture
 *
 * Records how an order is paid: cash, UPI, card, credit, or complimentary.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b04/
 */
@ApiTags('B04 - Payment Mode Capture')
@ApiBearerAuth()
@Controller('api/pos/payments')
export class B04Controller {
  constructor(private readonly service: B04Service) {}

  /** POST /api/pos/payments — Record payment for an order */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/payments/:orderId — Get payment for order */
  @Get(':orderId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByOrderId(@Param('orderId') orderId: string) {
    // TODO (B04): implement GET /api/pos/payments/:orderId — Get payment for order
        return { ok: true, endpoint: 'api/pos/payments/:orderId', args: { orderId } };
  }

  /** GET /api/pos/payments/summary — Daily payment mode summary */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
