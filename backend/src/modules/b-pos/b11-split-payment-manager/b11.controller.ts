import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B11Service } from './b11.service';
import { CreateB11Dto } from './dto/create-b11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B11 — Split Payment Manager
 *
 * Allows a single order to be paid partly by cash and partly by UPI or card.
 *
 * Category: POS & Billing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b11/
 */
@ApiTags('B11 - Split Payment Manager')
@ApiBearerAuth()
@Controller('api/pos/payments/split')
export class B11Controller {
  constructor(private readonly service: B11Service) {}

  /** POST /api/pos/payments/split — Record a split payment */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/payments/split/:orderId — Get split payment details */
  @Get(':orderId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByOrderId(@Param('orderId') orderId: string) {
    // TODO (B11): implement GET /api/pos/payments/split/:orderId — Get split payment details
        return { ok: true, endpoint: 'api/pos/payments/split/:orderId', args: { orderId } };
  }

  /** GET /api/pos/payments/split/summary — Daily split payment summary */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
