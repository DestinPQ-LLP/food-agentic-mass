import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E13Service } from './e13.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E13 — Kitchen Completion Report
 *
 * End-of-day report summarising items prepared, served, held, wasted, and average prep time.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e13/
 */
@ApiTags('E13 - Kitchen Completion Report')
@ApiBearerAuth()
@Controller('api/kitchen/report')
export class E13Controller {
  constructor(private readonly service: E13Service) {}

  /** GET /api/kitchen/report/daily — Daily kitchen completion report */
  @Get('daily')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDaily(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/report/shift — Shift-wise kitchen report */
  @Get('shift')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getShift(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/report/pdf — Download as PDF */
  @Get('pdf')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPdf(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
