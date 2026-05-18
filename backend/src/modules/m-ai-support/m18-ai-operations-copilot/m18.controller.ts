import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M18Service } from './m18.service';
import { CreateM18Dto } from './dto/create-m18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M18 — AI Operations Copilot
 *
 * Unified AI assistant that helps staff with operational decisions across all modules.
 *
 * Category: AI Support  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m18/
 */
@ApiTags('M18 - AI Operations Copilot')
@ApiBearerAuth()
@Controller('api/ai/copilot')
export class M18Controller {
  constructor(private readonly service: M18Service) {}

  /** POST /api/ai/copilot/ask — Ask the operations copilot */
  @Post('ask')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAsk(@Body() dto: CreateM18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/copilot/suggestions — Proactive suggestions from copilot */
  @Get('suggestions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSuggestions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/copilot/history — Copilot conversation history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
