import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K06Service } from './k06.service';
import { CreateK06Dto } from './dto/create-k06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K06 — Delivery Confirmation Screen
 *
 * Agent confirms successful delivery with customer signature or photo proof.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k06/
 */
@ApiTags('K06 - Delivery Confirmation Screen')
@ApiBearerAuth()
@Controller('api/delivery/orders')
export class K06Controller {
  constructor(private readonly service: K06Service) {}

  /** POST /api/delivery/orders/:id/confirm — Confirm delivery */
  @Post(':id/confirm')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdConfirm(@Param('id') id: string, @Body() dto: CreateK06Dto) {
    // TODO (K06): implement POST /api/delivery/orders/:id/confirm — Confirm delivery
        return { ok: true, endpoint: 'api/delivery/orders/:id/confirm', args: { id, dto } };
  }

  /** GET /api/delivery/orders/:id/proof — Get delivery proof */
  @Get(':id/proof')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdProof(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/delivery/orders/confirmed — Confirmed deliveries today */
  @Get('confirmed')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConfirmed(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
