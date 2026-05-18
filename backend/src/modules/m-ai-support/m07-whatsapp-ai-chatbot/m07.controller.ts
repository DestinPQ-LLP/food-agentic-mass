import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M07Service } from './m07.service';
import { CreateM07Dto } from './dto/create-m07.dto';
import { UpdateM07Dto } from './dto/update-m07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M07 — WhatsApp AI Chatbot
 *
 * Conversational AI that handles customer queries, order status, and menu questions on WhatsApp.
 *
 * Category: AI Support  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m07/
 */
@ApiTags('M07 - WhatsApp AI Chatbot')
@ApiBearerAuth()
@Controller('api/ai/chatbot')
export class M07Controller {
  constructor(private readonly service: M07Service) {}

  /** POST /api/ai/chatbot/webhook — Receive WhatsApp chatbot message */
  @Post('webhook')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createWebhook(@Body() dto: CreateM07Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/chatbot/sessions — Active chatbot sessions */
  @Get('sessions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSessions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/ai/chatbot/knowledge — Update chatbot knowledge base */
  @Put('knowledge')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateKnowledge(@Body() dto: UpdateM07Dto) {
    // TODO (M07): implement PUT /api/ai/chatbot/knowledge — Update chatbot knowledge base
        return { ok: true, endpoint: 'api/ai/chatbot/knowledge', args: { dto } };
  }
}
