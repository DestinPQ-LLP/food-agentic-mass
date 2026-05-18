import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C05Service } from './c05.service';
import { CreateC05Dto } from './dto/create-c05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C05 — Loyalty Points Engine
 *
 * Awards points per order and allows redemption at billing, configurable by owner.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c05/
 */
@ApiTags('C05 - Loyalty Points Engine')
@ApiBearerAuth()
@Controller('api/crm/loyalty')
export class C05Controller {
  constructor(private readonly service: C05Service) {}

  /** POST /api/crm/loyalty/award — Award points to customer */
  @Post('award')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAward(@Body() dto: CreateC05Dto) {
    return this.service.create(dto);
  }

  /** POST /api/crm/loyalty/redeem — Redeem points on order */
  @Post('redeem')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createRedeem(@Body() dto: CreateC05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/loyalty/:customerId/balance — Get points balance */
  @Get(':customerId/balance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByCustomerIdBalance(@Param('customerId') customerId: string) {
    // TODO (C05): implement GET /api/crm/loyalty/:customerId/balance — Get points balance
        return { ok: true, endpoint: 'api/crm/loyalty/:customerId/balance', args: { customerId } };
  }
}
