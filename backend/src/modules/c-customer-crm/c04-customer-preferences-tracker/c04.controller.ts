import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C04Service } from './c04.service';
import { UpdateC04Dto } from './dto/update-c04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C04 — Customer Preferences Tracker
 *
 * Tracks and stores item preferences, dietary notes, and special requests per customer.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c04/
 */
@ApiTags('C04 - Customer Preferences Tracker')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C04Controller {
  constructor(private readonly service: C04Service) {}

  /** PUT /api/crm/customers/:id/preferences — Save customer preferences */
  @Put(':id/preferences')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdPreferences(@Param('id') id: string, @Body() dto: UpdateC04Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/crm/customers/:id/preferences — Get customer preferences */
  @Get(':id/preferences')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdPreferences(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/crm/customers/preferences/popular — Most common preferences */
  @Get('preferences/popular')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPreferencesPopular(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
