import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M11Service } from './m11.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M11 — Menu Performance Analyser
 *
 * AI-driven analysis of the menu: star performers, dogs, plowhorses, and puzzles.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m11/
 */
@ApiTags('M11 - Menu Performance Analyser')
@ApiBearerAuth()
@Controller('api/ai/menu')
export class M11Controller {
  constructor(private readonly service: M11Service) {}

  /** GET /api/ai/menu/analysis — Full menu performance analysis */
  @Get('analysis')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAnalysis(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/menu/stars — Top performing items */
  @Get('stars')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStars(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/menu/underperformers — Underperforming items */
  @Get('underperformers')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnderperformers(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
