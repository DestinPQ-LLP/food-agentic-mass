import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K02Service } from './k02.service';
import { UpdateK02Dto } from './dto/update-k02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K02 — Delivery Agent Assignment
 *
 * Assigns delivery orders to available agents with workload visibility.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k02/
 */
@ApiTags('K02 - Delivery Agent Assignment')
@ApiBearerAuth()
@Controller('api/delivery')
export class K02Controller {
  constructor(private readonly service: K02Service) {}

  /** GET /api/delivery/agents — List delivery agents */
  @Get('agents')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAgents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/orders/:id/assign — Assign agent to order */
  @Put('orders/:id/assign')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateOrdersByIdAssign(@Param('id') id: string, @Body() dto: UpdateK02Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/delivery/agents/:id/orders — Agent's active orders */
  @Get('agents/:id/orders')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAgentsByIdOrders(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
