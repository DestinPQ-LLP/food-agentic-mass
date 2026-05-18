import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B08Service } from './b08.service';
import { CreateB08Dto } from './dto/create-b08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B08 — Discount & Offer Manager
 *
 * Admin creates offer rules (percentage off, flat discount, item-level offer) that cashiers can apply.
 *
 * Category: POS & Billing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b08/
 */
@ApiTags('B08 - Discount & Offer Manager')
@ApiBearerAuth()
@Controller('api/pos')
export class B08Controller {
  constructor(private readonly service: B08Service) {}

  /** POST /api/pos/offers — Create an offer */
  @Post('offers')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOffers(@Body() dto: CreateB08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/offers/active — List active offers */
  @Get('offers/active')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOffersActive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/pos/orders/:id/apply-offer — Apply offer to order */
  @Post('orders/:id/apply-offer')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOrdersByIdApplyOffer(@Param('id') id: string, @Body() dto: CreateB08Dto) {
    // TODO (B08): implement POST /api/pos/orders/:id/apply-offer — Apply offer to order
        return { ok: true, endpoint: 'api/pos/orders/:id/apply-offer', args: { id, dto } };
  }
}
