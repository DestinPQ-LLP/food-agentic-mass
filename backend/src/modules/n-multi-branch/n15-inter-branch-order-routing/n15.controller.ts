import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N15Service } from './n15.service';
import { CreateN15Dto } from './dto/create-n15.dto';
import { UpdateN15Dto } from './dto/update-n15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N15 — Inter-Branch Order Routing
 *
 * Routes overflow orders from a busy branch to a nearby branch for preparation.
 *
 * Category: Multi-Branch  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n15/
 */
@ApiTags('N15 - Inter-Branch Order Routing')
@ApiBearerAuth()
@Controller('api/branches')
export class N15Controller {
  constructor(private readonly service: N15Service) {}

  /** POST /api/branches/orders/route — Route order to another branch */
  @Post('orders/route')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOrdersRoute(@Body() dto: CreateN15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches/orders/routed — Orders routed between branches */
  @Get('orders/routed')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOrdersRouted(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/branches/routing/rules — Configure routing rules */
  @Put('routing/rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateRoutingRules(@Body() dto: UpdateN15Dto) {
    // TODO (N15): implement PUT /api/branches/routing/rules — Configure routing rules
        return { ok: true, endpoint: 'api/branches/routing/rules', args: { dto } };
  }
}
