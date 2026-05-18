import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K08Service } from './k08.service';
import { CreateK08Dto } from './dto/create-k08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K08 — Delivery Feedback Collector
 *
 * Requests post-delivery rating from the customer via WhatsApp.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k08/
 */
@ApiTags('K08 - Delivery Feedback Collector')
@ApiBearerAuth()
@Controller('api/delivery/feedback')
export class K08Controller {
  constructor(private readonly service: K08Service) {}

  /** POST /api/delivery/feedback/request — Send feedback request */
  @Post('request')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createRequest(@Body() dto: CreateK08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/feedback — List delivery feedback */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/feedback/average — Average delivery rating */
  @Get('average')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAverage(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
