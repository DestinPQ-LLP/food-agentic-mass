import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J09Service } from './j09.service';
import { UpdateJ09Dto } from './dto/update-j09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J09 — Pending Payment Alerts
 *
 * Notifies staff of upcoming or overdue vendor or customer payments.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j09/
 */
@ApiTags('J09 - Pending Payment Alerts')
@ApiBearerAuth()
@Controller('api/accounts/alerts')
export class J09Controller {
  constructor(private readonly service: J09Service) {}

  /** GET /api/accounts/alerts/pending — Pending payment alerts */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/accounts/alerts/:id/dismiss — Dismiss alert */
  @Put(':id/dismiss')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdDismiss(@Param('id') id: string, @Body() dto: UpdateJ09Dto) {
    return this.service.update(id, dto);
  }

  /** PUT /api/accounts/alerts/settings — Configure alert lead time */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateJ09Dto) {
    // TODO (J09): implement PUT /api/accounts/alerts/settings — Configure alert lead time
        return { ok: true, endpoint: 'api/accounts/alerts/settings', args: { dto } };
  }
}
