import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C11Service } from './c11.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C11 — Visit Frequency Tracker
 *
 * Shows how often individual customers visit: daily, weekly, monthly, or irregular.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c11/
 */
@ApiTags('C11 - Visit Frequency Tracker')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C11Controller {
  constructor(private readonly service: C11Service) {}

  /** GET /api/crm/customers/:id/visit-frequency — Visit frequency for customer */
  @Get(':id/visit-frequency')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdVisitFrequency(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/crm/customers/frequency/segments — Frequency-based segments */
  @Get('frequency/segments')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFrequencySegments(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/frequency/trend — Frequency trend over time */
  @Get('frequency/trend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFrequencyTrend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
