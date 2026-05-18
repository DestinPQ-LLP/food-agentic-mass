import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C03Service } from './c03.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C03 — Repeat Customer Detector
 *
 * Automatically flags when a returning customer is identified at billing to enable personalised service.
 *
 * Category: Customer CRM  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c03/
 */
@ApiTags('C03 - Repeat Customer Detector')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C03Controller {
  constructor(private readonly service: C03Service) {}

  /** GET /api/crm/customers/:id/repeat-status — Is customer a repeat visitor? */
  @Get(':id/repeat-status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdRepeatStatus(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/crm/customers/repeat/list — List all repeat customers */
  @Get('repeat/list')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRepeatList(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/repeat/stats — Repeat customer statistics */
  @Get('repeat/stats')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRepeatStats(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
