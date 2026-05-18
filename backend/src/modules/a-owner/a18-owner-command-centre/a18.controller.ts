import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A18Service } from './a18.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A18 — Owner Command Centre
 *
 * Unified single-screen dashboard combining health score, alerts, daily sales, peak hours, and top items.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a18/
 */
@ApiTags('A18 - Owner Command Centre')
@ApiBearerAuth()
@Controller('api/owner/command-centre')
export class A18Controller {
  constructor(private readonly service: A18Service) {}

  /** GET /api/owner/command-centre — Full command centre payload */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/command-centre/live — Live-updating metrics */
  @Get('live')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/command-centre/actions — Pending action items */
  @Get('actions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getActions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
