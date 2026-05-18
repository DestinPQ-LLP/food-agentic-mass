import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J12Service } from './j12.service';
import { UpdateJ12Dto } from './dto/update-j12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J12 — Tally/Accounting Export
 *
 * Exports transactions in a format compatible with Tally or other accounting software.
 *
 * Category: Accounts  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j12/
 */
@ApiTags('J12 - Tally/Accounting Export')
@ApiBearerAuth()
@Controller('api/accounts/export')
export class J12Controller {
  constructor(private readonly service: J12Service) {}

  /** GET /api/accounts/export/tally — Export Tally-format XML */
  @Get('tally')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTally(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/export/csv — Export transactions as CSV */
  @Get('csv')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCsv(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/accounts/export/settings — Configure export mapping */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateJ12Dto) {
    // TODO (J12): implement PUT /api/accounts/export/settings — Configure export mapping
        return { ok: true, endpoint: 'api/accounts/export/settings', args: { dto } };
  }
}
