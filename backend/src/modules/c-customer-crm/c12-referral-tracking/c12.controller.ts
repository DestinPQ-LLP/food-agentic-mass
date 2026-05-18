import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C12Service } from './c12.service';
import { CreateC12Dto } from './dto/create-c12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C12 — Referral Tracking
 *
 * Tracks customers who referred others, awarding points or rewards for successful referrals.
 *
 * Category: Customer CRM  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c12/
 */
@ApiTags('C12 - Referral Tracking')
@ApiBearerAuth()
@Controller('api/crm/referrals')
export class C12Controller {
  constructor(private readonly service: C12Service) {}

  /** POST /api/crm/referrals — Record a referral */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateC12Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/referrals/:customerId — Get referrals by customer */
  @Get(':customerId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByCustomerId(@Param('customerId') customerId: string) {
    // TODO (C12): implement GET /api/crm/referrals/:customerId — Get referrals by customer
        return { ok: true, endpoint: 'api/crm/referrals/:customerId', args: { customerId } };
  }

  /** GET /api/crm/referrals/leaderboard — Top referrers */
  @Get('leaderboard')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLeaderboard(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
