import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J17Service } from './j17.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J17 — Financial Year Summary
 *
 * Annual summary of revenue, expenses, taxes, and profit for financial year review.
 *
 * Category: Accounts  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j17/
 */
@ApiTags('J17 - Financial Year Summary')
@ApiBearerAuth()
@Controller('api/accounts/fy-summary')
export class J17Controller {
  constructor(private readonly service: J17Service) {}

  /** GET /api/accounts/fy-summary — Financial year summary */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/fy-summary/compare — Year-on-year comparison */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/fy-summary/pdf — Download PDF */
  @Get('pdf')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPdf(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
