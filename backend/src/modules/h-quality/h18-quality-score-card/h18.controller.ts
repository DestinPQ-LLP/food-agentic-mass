import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H18Service } from './h18.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H18 — Quality Score Card
 *
 * Single composite quality score combining ratings, complaints, escalations, and hygiene compliance.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h18/
 */
@ApiTags('H18 - Quality Score Card')
@ApiBearerAuth()
@Controller('api/quality/scorecard')
export class H18Controller {
  constructor(private readonly service: H18Service) {}

  /** GET /api/quality/scorecard — Current quality scorecard */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/scorecard/history — Scorecard history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/scorecard/components — Score component breakdown */
  @Get('components')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getComponents(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
