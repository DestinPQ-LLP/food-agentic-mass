import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D17Service } from './d17.service';
import { CreateD17Dto } from './dto/create-d17.dto';
import { UpdateD17Dto } from './dto/update-d17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D17 — WhatsApp Order Chatbot
 *
 * Accepts customer orders via WhatsApp conversation using a guided menu-selection flow.
 *
 * Category: WhatsApp Marketing  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d17/
 */
@ApiTags('D17 - WhatsApp Order Chatbot')
@ApiBearerAuth()
@Controller('api/whatsapp/chatbot')
export class D17Controller {
  constructor(private readonly service: D17Service) {}

  /** POST /api/whatsapp/chatbot/webhook — WhatsApp webhook receiver */
  @Post('webhook')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createWebhook(@Body() dto: CreateD17Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/chatbot/sessions — Active chatbot sessions */
  @Get('sessions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSessions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/chatbot/menu — Update chatbot menu */
  @Put('menu')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateMenu(@Body() dto: UpdateD17Dto) {
    // TODO (D17): implement PUT /api/whatsapp/chatbot/menu — Update chatbot menu
        return { ok: true, endpoint: 'api/whatsapp/chatbot/menu', args: { dto } };
  }
}
