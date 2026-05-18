import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J06Service } from './j06.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J06 — GST/Tax Summary
 *
 * Calculates total GST collected and input tax credit for a period, ready for filing.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j06/
 */
@ApiTags('J06 - GST/Tax Summary')
@ApiBearerAuth()
@Controller('api/accounts/gst')
export class J06Controller {
  constructor(private readonly service: J06Service) {}

  /** GET /api/accounts/gst/summary — GST summary for period */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/gst/by-slab — GST by tax slab */
  @Get('by-slab')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBySlab(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/gst/export — Export GST report */
  @Get('export')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
