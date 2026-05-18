import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C16Service } from './c16.service';
import { UpdateC16Dto } from './dto/update-c16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C16 — Customer Profile Dashboard
 *
 * Full customer profile: contact, segments, LTV, order history, preferences, and feedback.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c16/
 */
@ApiTags('C16 - Customer Profile Dashboard')
@ApiBearerAuth()
@Controller('api/crm/customers/:id')
export class C16Controller {
  constructor(private readonly service: C16Service) {}

  /** GET /api/crm/customers/:id/profile — Full customer profile */
  @Get('profile')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getProfile(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/crm/customers/:id/profile — Update profile fields */
  @Put('profile')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateProfile(@Body() dto: UpdateC16Dto) {
    // TODO (C16): implement PUT /api/crm/customers/:id/profile — Update profile fields
        return { ok: true, endpoint: 'api/crm/customers/:id/profile', args: { dto } };
  }

  /** GET /api/crm/customers/:id/activity — Customer activity timeline */
  @Get('activity')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getActivity(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
