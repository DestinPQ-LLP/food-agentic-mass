import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G18Service } from './g18.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G18 — Vendor Analytics Dashboard
 *
 * Aggregated view of procurement spend, delivery performance, and rate trends across all vendors.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g18/
 */
@ApiTags('G18 - Vendor Analytics Dashboard')
@ApiBearerAuth()
@Controller('api/vendors/analytics')
export class G18Controller {
  constructor(private readonly service: G18Service) {}

  /** GET /api/vendors/analytics — Full vendor analytics */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/analytics/spend — Spend analytics */
  @Get('spend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSpend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/analytics/performance — Performance analytics */
  @Get('performance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPerformance(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
