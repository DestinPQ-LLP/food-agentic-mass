import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K01Service } from './k01.service';
import { CreateK01Dto } from './dto/create-k01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K01 — Delivery Order Manager
 *
 * Manages all delivery orders: creation, agent assignment, and status tracking.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k01/
 */
@ApiTags('K01 - Delivery Order Manager')
@ApiBearerAuth()
@Controller('api/delivery/orders')
export class K01Controller {
  constructor(private readonly service: K01Service) {}

  /** POST /api/delivery/orders — Create delivery order */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateK01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/orders — List delivery orders */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/orders/active — Active deliveries */
  @Get('active')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getActive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
