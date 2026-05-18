import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H03Service } from './h03.service';
import { UpdateH03Dto } from './dto/update-h03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H03 — Poor Rating Escalation
 *
 * Auto-escalates orders with rating <= 2 stars to manager via WhatsApp and alert centre.
 *
 * Category: Quality  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h03/
 */
@ApiTags('H03 - Poor Rating Escalation')
@ApiBearerAuth()
@Controller('api/quality/escalations')
export class H03Controller {
  constructor(private readonly service: H03Service) {}

  /** GET /api/quality/escalations — List escalated ratings */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/quality/escalations/:id/resolve — Resolve escalation */
  @Put(':id/resolve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdResolve(@Param('id') id: string, @Body() dto: UpdateH03Dto) {
    return this.service.update(id, dto);
  }

  /** PUT /api/quality/escalations/settings — Set escalation threshold */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateH03Dto) {
    // TODO (H03): implement PUT /api/quality/escalations/settings — Set escalation threshold
        return { ok: true, endpoint: 'api/quality/escalations/settings', args: { dto } };
  }
}
