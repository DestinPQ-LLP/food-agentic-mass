import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H07Service } from './h07.service';
import { CreateH07Dto } from './dto/create-h07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H07 — Feedback Sentiment Analyser
 *
 * Classifies customer feedback text as positive, neutral, or negative using AI.
 *
 * Category: Quality  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h07/
 */
@ApiTags('H07 - Feedback Sentiment Analyser')
@ApiBearerAuth()
@Controller('api/quality/sentiment')
export class H07Controller {
  constructor(private readonly service: H07Service) {}

  /** POST /api/quality/sentiment/analyse — Analyse feedback text */
  @Post('analyse')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAnalyse(@Body() dto: CreateH07Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/sentiment/summary — Sentiment summary for period */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/sentiment/negative — All negative feedback */
  @Get('negative')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getNegative(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
