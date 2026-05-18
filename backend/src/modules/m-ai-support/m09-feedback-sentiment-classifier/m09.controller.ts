import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M09Service } from './m09.service';
import { CreateM09Dto } from './dto/create-m09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M09 — Feedback Sentiment Classifier
 *
 * Classifies customer feedback as positive, neutral, or negative with category tagging.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m09/
 */
@ApiTags('M09 - Feedback Sentiment Classifier')
@ApiBearerAuth()
@Controller('api/ai/sentiment')
export class M09Controller {
  constructor(private readonly service: M09Service) {}

  /** POST /api/ai/sentiment/classify — Classify feedback text */
  @Post('classify')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClassify(@Body() dto: CreateM09Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/sentiment/summary — Sentiment summary for period */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/sentiment/trend — Sentiment trend over time */
  @Get('trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
