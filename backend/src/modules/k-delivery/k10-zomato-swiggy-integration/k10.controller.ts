import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K10Service } from './k10.service';
import { CreateK10Dto } from './dto/create-k10.dto';
import { UpdateK10Dto } from './dto/update-k10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K10 — Zomato/Swiggy Integration
 *
 * Syncs online aggregator orders into the system automatically.
 *
 * Category: Delivery  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k10/
 */
@ApiTags('K10 - Zomato/Swiggy Integration')
@ApiBearerAuth()
@Controller('api/delivery/aggregators')
export class K10Controller {
  constructor(private readonly service: K10Service) {}

  /** POST /api/delivery/aggregators/webhook — Aggregator webhook receiver */
  @Post('webhook')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createWebhook(@Body() dto: CreateK10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/aggregators/orders — Orders from aggregators */
  @Get('orders')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOrders(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/aggregators/settings — Configure aggregator credentials */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateK10Dto) {
    // TODO (K10): implement PUT /api/delivery/aggregators/settings — Configure aggregator credentials
        return { ok: true, endpoint: 'api/delivery/aggregators/settings', args: { dto } };
  }
}
