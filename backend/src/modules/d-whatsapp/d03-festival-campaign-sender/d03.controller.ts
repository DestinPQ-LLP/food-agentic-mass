import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D03Service } from './d03.service';
import { CreateD03Dto } from './dto/create-d03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D03 — Festival Campaign Sender
 *
 * Creates and schedules promotional campaigns tied to festivals, seasons, or custom events.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d03/
 */
@ApiTags('D03 - Festival Campaign Sender')
@ApiBearerAuth()
@Controller('api/whatsapp/campaigns')
export class D03Controller {
  constructor(private readonly service: D03Service) {}

  /** POST /api/whatsapp/campaigns — Create a campaign */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateD03Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/campaigns — List campaigns */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/whatsapp/campaigns/:id/launch — Launch campaign */
  @Post(':id/launch')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdLaunch(@Param('id') id: string, @Body() dto: CreateD03Dto) {
    // TODO (D03): implement POST /api/whatsapp/campaigns/:id/launch — Launch campaign
        return { ok: true, endpoint: 'api/whatsapp/campaigns/:id/launch', args: { id, dto } };
  }
}
