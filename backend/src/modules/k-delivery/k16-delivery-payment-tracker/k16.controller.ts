import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K16Service } from './k16.service';
import { CreateK16Dto } from './dto/create-k16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K16 — Delivery Payment Tracker
 *
 * Tracks cash-on-delivery collections and online payments for delivery orders.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k16/
 */
@ApiTags('K16 - Delivery Payment Tracker')
@ApiBearerAuth()
@Controller('api/delivery/payments')
export class K16Controller {
  constructor(private readonly service: K16Service) {}

  /** POST /api/delivery/payments/collect — Record COD collection */
  @Post('collect')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCollect(@Body() dto: CreateK16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/payments/pending — Pending COD collections */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/payments/summary — Payment collection summary */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
