import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H16Service } from './h16.service';
import { UpdateH16Dto } from './dto/update-h16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H16 — Quality Alert Notifications
 *
 * Real-time alerts for quality events: escalated rating, new serious complaint, or checklist incomplete.
 *
 * Category: Quality  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h16/
 */
@ApiTags('H16 - Quality Alert Notifications')
@ApiBearerAuth()
@Controller('api/quality/alerts')
export class H16Controller {
  constructor(private readonly service: H16Service) {}

  /** GET /api/quality/alerts — All quality alerts */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/quality/alerts/:id/dismiss — Dismiss alert */
  @Put(':id/dismiss')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdDismiss(@Param('id') id: string, @Body() dto: UpdateH16Dto) {
    return this.service.update(id, dto);
  }

  /** PUT /api/quality/alerts/settings — Configure alert rules */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateH16Dto) {
    // TODO (H16): implement PUT /api/quality/alerts/settings — Configure alert rules
        return { ok: true, endpoint: 'api/quality/alerts/settings', args: { dto } };
  }
}
