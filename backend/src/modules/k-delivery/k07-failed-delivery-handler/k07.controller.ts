import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K07Service } from './k07.service';
import { CreateK07Dto } from './dto/create-k07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K07 — Failed Delivery Handler
 *
 * Manages undelivered orders: records reason, triggers re-delivery or refund.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k07/
 */
@ApiTags('K07 - Failed Delivery Handler')
@ApiBearerAuth()
@Controller('api/delivery/orders')
export class K07Controller {
  constructor(private readonly service: K07Service) {}

  /** POST /api/delivery/orders/:id/fail — Mark delivery as failed */
  @Post(':id/fail')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdFail(@Param('id') id: string, @Body() dto: CreateK07Dto) {
    // TODO (K07): implement POST /api/delivery/orders/:id/fail — Mark delivery as failed
        return { ok: true, endpoint: 'api/delivery/orders/:id/fail', args: { id, dto } };
  }

  /** GET /api/delivery/orders/failed — Failed deliveries */
  @Get('failed')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFailed(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/delivery/orders/:id/retry — Schedule re-delivery */
  @Post(':id/retry')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdRetry(@Param('id') id: string, @Body() dto: CreateK07Dto) {
    // TODO (K07): implement POST /api/delivery/orders/:id/retry — Schedule re-delivery
        return { ok: true, endpoint: 'api/delivery/orders/:id/retry', args: { id, dto } };
  }
}
