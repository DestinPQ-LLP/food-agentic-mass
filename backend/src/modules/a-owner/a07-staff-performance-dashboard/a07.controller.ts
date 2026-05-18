import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A07Service } from './a07.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A07 — Staff Performance Dashboard
 *
 * Shows staff-wise attendance, task completion rate, and order-handling speed for the selected period.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a07/
 */
@ApiTags('A07 - Staff Performance Dashboard')
@ApiBearerAuth()
@Controller('api/owner/staff-performance')
export class A07Controller {
  constructor(private readonly service: A07Service) {}

  /** GET /api/owner/staff-performance — Staff KPIs summary */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/staff-performance/:staffId — Individual staff detail */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (A07): implement GET /api/owner/staff-performance/:staffId — Individual staff detail
        return { ok: true, endpoint: 'api/owner/staff-performance/:staffId', args: { staffId } };
  }

  /** GET /api/owner/staff-performance/shifts — Shift-wise productivity */
  @Get('shifts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getShifts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
