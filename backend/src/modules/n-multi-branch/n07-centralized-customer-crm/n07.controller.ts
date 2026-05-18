import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N07Service } from './n07.service';
import { UpdateN07Dto } from './dto/update-n07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N07 — Centralized Customer CRM
 *
 * Unified customer database visible across all branches; recognises customer at any outlet.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n07/
 */
@ApiTags('N07 - Centralized Customer CRM')
@ApiBearerAuth()
@Controller('api/branches/crm')
export class N07Controller {
  constructor(private readonly service: N07Service) {}

  /** GET /api/branches/crm/customers — Global customer database */
  @Get('customers')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCustomers(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/crm/customers/:id/all-branches — Customer activity across branches */
  @Get('customers/:id/all-branches')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCustomersByIdAllBranches(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** PUT /api/branches/crm/settings — CRM sharing settings */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateN07Dto) {
    // TODO (N07): implement PUT /api/branches/crm/settings — CRM sharing settings
        return { ok: true, endpoint: 'api/branches/crm/settings', args: { dto } };
  }
}
