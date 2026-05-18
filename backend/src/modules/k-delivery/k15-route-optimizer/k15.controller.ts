import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K15Service } from './k15.service';
import { CreateK15Dto } from './dto/create-k15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K15 — Route Optimizer
 *
 * Suggests the most efficient delivery sequence for agents with multiple stops.
 *
 * Category: Delivery  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k15/
 */
@ApiTags('K15 - Route Optimizer')
@ApiBearerAuth()
@Controller('api/delivery/routes')
export class K15Controller {
  constructor(private readonly service: K15Service) {}

  /** POST /api/delivery/routes/optimize — Optimize delivery route */
  @Post('optimize')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOptimize(@Body() dto: CreateK15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/routes/:agentId/today — Today's route for agent */
  @Get(':agentId/today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByAgentIdToday(@Param('agentId') agentId: string) {
    // TODO (K15): implement GET /api/delivery/routes/:agentId/today — Today's route for agent
        return { ok: true, endpoint: 'api/delivery/routes/:agentId/today', args: { agentId } };
  }

  /** GET /api/delivery/routes/settings — Optimization settings */
  @Get('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSettings(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
