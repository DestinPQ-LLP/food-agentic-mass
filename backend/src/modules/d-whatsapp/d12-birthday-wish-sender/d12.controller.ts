import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D12Service } from './d12.service';
import { CreateD12Dto } from './dto/create-d12.dto';
import { UpdateD12Dto } from './dto/update-d12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D12 — Birthday Wish Sender
 *
 * Sends automated birthday wishes with an optional discount coupon via WhatsApp.
 *
 * Category: WhatsApp Marketing  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d12/
 */
@ApiTags('D12 - Birthday Wish Sender')
@ApiBearerAuth()
@Controller('api/whatsapp/birthday-wish')
export class D12Controller {
  constructor(private readonly service: D12Service) {}

  /** POST /api/whatsapp/birthday-wish/send — Send birthday wishes today */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD12Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/birthday-wish/template — Template config */
  @Get('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/birthday-wish/offer — Set birthday offer */
  @Put('offer')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateOffer(@Body() dto: UpdateD12Dto) {
    // TODO (D12): implement PUT /api/whatsapp/birthday-wish/offer — Set birthday offer
        return { ok: true, endpoint: 'api/whatsapp/birthday-wish/offer', args: { dto } };
  }
}
