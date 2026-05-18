import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C02Service } from './c02.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C02 — Customer Order History
 *
 * Shows all past orders linked to a customer's mobile number with date, items, and spend.
 *
 * Category: Customer CRM  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c02/
 */
@ApiTags('C02 - Customer Order History')
@ApiBearerAuth()
@Controller('api/crm/customers/:id/orders')
export class C02Controller {
  constructor(private readonly service: C02Service) {}

  /** GET /api/crm/customers/:id/orders — Customer order history */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/:id/orders/summary — Spend and visit summary */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/:id/orders/favourite-items — Most ordered items */
  @Get('favourite-items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFavouriteItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
