import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J14Service } from './j14.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J14 — Monthly Accounts Report
 *
 * Comprehensive monthly accounts summary for owner review.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j14/
 */
@ApiTags('J14 - Monthly Accounts Report')
@ApiBearerAuth()
@Controller('api/accounts/monthly-report')
export class J14Controller {
  constructor(private readonly service: J14Service) {}

  /** GET /api/accounts/monthly-report — Monthly accounts report */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/monthly-report/pdf — Download PDF */
  @Get('pdf')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPdf(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/monthly-report/compare — Compare months */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
