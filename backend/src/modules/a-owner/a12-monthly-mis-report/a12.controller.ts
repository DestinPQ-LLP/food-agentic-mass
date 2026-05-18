import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A12Service } from './a12.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A12 — Monthly MIS Report
 *
 * Comprehensive monthly report with revenue, costs, wastage, top products, and staff summary.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a12/
 */
@ApiTags('A12 - Monthly MIS Report')
@ApiBearerAuth()
@Controller('api/owner/monthly-report')
export class A12Controller {
  constructor(private readonly service: A12Service) {}

  /** GET /api/owner/monthly-report — Monthly aggregated data */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/monthly-report/pdf — Download as PDF */
  @Get('pdf')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPdf(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/monthly-report/compare — Month-on-month comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
