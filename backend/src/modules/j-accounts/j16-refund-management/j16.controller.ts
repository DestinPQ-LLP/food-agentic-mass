import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J16Service } from './j16.service';
import { CreateJ16Dto } from './dto/create-j16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J16 — Refund Management
 *
 * Processes and records order refunds, updating revenue and cash records accordingly.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j16/
 */
@ApiTags('J16 - Refund Management')
@ApiBearerAuth()
@Controller('api/accounts/refunds')
export class J16Controller {
  constructor(private readonly service: J16Service) {}

  /** POST /api/accounts/refunds — Create refund */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateJ16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/refunds — List refunds */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/refunds/summary — Refund summary for period */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
