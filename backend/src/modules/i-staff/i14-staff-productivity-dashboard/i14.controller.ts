import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I14Service } from './i14.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I14 — Staff Productivity Dashboard
 *
 * Aggregated productivity metrics per staff: tasks, orders, attendance, and rating.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i14/
 */
@ApiTags('I14 - Staff Productivity Dashboard')
@ApiBearerAuth()
@Controller('api/staff/productivity')
export class I14Controller {
  constructor(private readonly service: I14Service) {}

  /** GET /api/staff/productivity — Team productivity overview */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/staff/productivity/:staffId — Individual productivity */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (I14): implement GET /api/staff/productivity/:staffId — Individual productivity
        return { ok: true, endpoint: 'api/staff/productivity/:staffId', args: { staffId } };
  }

  /** GET /api/staff/productivity/trends — Productivity trends */
  @Get('trends')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTrends(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
