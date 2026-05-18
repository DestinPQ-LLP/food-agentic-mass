import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I06Service } from './i06.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I06 — Staff Performance Report
 *
 * Aggregates attendance, task completion, orders handled, and manager ratings per staff.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i06/
 */
@ApiTags('I06 - Staff Performance Report')
@ApiBearerAuth()
@Controller('api/staff')
export class I06Controller {
  constructor(private readonly service: I06Service) {}

  /** GET /api/staff/:id/performance — Individual performance report */
  @Get(':id/performance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdPerformance(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/staff/performance/ranking — Staff performance ranking */
  @Get('performance/ranking')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPerformanceRanking(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/staff/performance/team — Team performance summary */
  @Get('performance/team')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPerformanceTeam(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
