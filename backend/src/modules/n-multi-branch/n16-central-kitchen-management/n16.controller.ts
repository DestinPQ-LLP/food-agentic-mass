import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N16Service } from './n16.service';
import { CreateN16Dto } from './dto/create-n16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N16 — Central Kitchen Management
 *
 * Manages a central production facility that supplies prepared items to multiple outlets.
 *
 * Category: Multi-Branch  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n16/
 */
@ApiTags('N16 - Central Kitchen Management')
@ApiBearerAuth()
@Controller('api/branches/central-kitchen')
export class N16Controller {
  constructor(private readonly service: N16Service) {}

  /** POST /api/branches/central-kitchen/production — Log central kitchen production */
  @Post('production')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createProduction(@Body() dto: CreateN16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches/central-kitchen/dispatch — Items dispatched to branches */
  @Get('dispatch')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDispatch(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/central-kitchen/orders — Branch supply orders for central kitchen */
  @Get('orders')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOrders(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
