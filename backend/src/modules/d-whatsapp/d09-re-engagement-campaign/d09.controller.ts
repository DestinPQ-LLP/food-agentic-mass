import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D09Service } from './d09.service';
import { CreateD09Dto } from './dto/create-d09.dto';
import { UpdateD09Dto } from './dto/update-d09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D09 — Re-engagement Campaign
 *
 * Sends a win-back message to customers who haven't visited in a configurable number of days.
 *
 * Category: WhatsApp Marketing  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d09/
 */
@ApiTags('D09 - Re-engagement Campaign')
@ApiBearerAuth()
@Controller('api/whatsapp/reengagement')
export class D09Controller {
  constructor(private readonly service: D09Service) {}

  /** POST /api/whatsapp/reengagement/send — Launch re-engagement campaign */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD09Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/reengagement/settings — Configure lapse days */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateD09Dto) {
    // TODO (D09): implement PUT /api/whatsapp/reengagement/settings — Configure lapse days
        return { ok: true, endpoint: 'api/whatsapp/reengagement/settings', args: { dto } };
  }

  /** GET /api/whatsapp/reengagement/results — Campaign response metrics */
  @Get('results')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getResults(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
