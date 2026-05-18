import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M17Service } from './m17.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M17 — Staff Insights Generator
 *
 * AI summarises staff performance patterns, risk of attrition, and productivity trends.
 *
 * Category: AI Support  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m17/
 */
@ApiTags('M17 - Staff Insights Generator')
@ApiBearerAuth()
@Controller('api/ai/staff')
export class M17Controller {
  constructor(private readonly service: M17Service) {}

  /** GET /api/ai/staff/insights — AI staff insights */
  @Get('insights')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getInsights(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/staff/attrition-risk — Staff with high attrition risk */
  @Get('attrition-risk')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAttritionRisk(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/staff/top-performers — AI-identified top performers */
  @Get('top-performers')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTopPerformers(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
