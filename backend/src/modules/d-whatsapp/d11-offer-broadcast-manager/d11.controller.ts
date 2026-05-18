import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D11Service } from './d11.service';
import { CreateD11Dto } from './dto/create-d11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D11 — Offer Broadcast Manager
 *
 * Sends promotional offers to customer segments with rich media (image + text + CTA).
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d11/
 */
@ApiTags('D11 - Offer Broadcast Manager')
@ApiBearerAuth()
@Controller('api/whatsapp/offers')
export class D11Controller {
  constructor(private readonly service: D11Service) {}

  /** POST /api/whatsapp/offers/broadcast — Broadcast an offer */
  @Post('broadcast')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createBroadcast(@Body() dto: CreateD11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/offers/broadcasts — List past broadcasts */
  @Get('broadcasts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBroadcasts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/whatsapp/offers/broadcasts/:id/stats — Broadcast statistics */
  @Get('broadcasts/:id/stats')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBroadcastsByIdStats(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
