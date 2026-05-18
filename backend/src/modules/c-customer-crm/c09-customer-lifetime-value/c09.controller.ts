import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C09Service } from './c09.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C09 — Customer Lifetime Value
 *
 * Calculates and displays total spend, visit count, and average order value per customer.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c09/
 */
@ApiTags('C09 - Customer Lifetime Value')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C09Controller {
  constructor(private readonly service: C09Service) {}

  /** GET /api/crm/customers/:id/ltv — LTV metrics for customer */
  @Get(':id/ltv')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdLtv(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/crm/customers/ltv/top — Top customers by LTV */
  @Get('ltv/top')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLtvTop(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/ltv/distribution — LTV distribution histogram */
  @Get('ltv/distribution')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLtvDistribution(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
