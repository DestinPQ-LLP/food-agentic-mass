import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M01Service } from './m01.service';
import { CreateM01Dto } from './dto/create-m01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M01 — Owner Q&A Business Bot
 *
 * Natural language chatbot where owner asks business questions and gets data-backed answers.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m01/
 */
@ApiTags('M01 - Owner Q&A Business Bot')
@ApiBearerAuth()
@Controller('api/ai/query')
export class M01Controller {
  constructor(private readonly service: M01Service) {}

  /** POST /api/ai/query — Submit natural language business query */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateM01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/query/history — Past queries and responses */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/query/suggestions — Suggested questions */
  @Get('suggestions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSuggestions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
