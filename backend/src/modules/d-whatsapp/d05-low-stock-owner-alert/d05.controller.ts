import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D05Service } from './d05.service';
import { CreateD05Dto } from './dto/create-d05.dto';
import { UpdateD05Dto } from './dto/update-d05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D05 — Low Stock Owner Alert
 *
 * Sends a WhatsApp alert to the owner or manager when any inventory item drops below reorder level.
 *
 * Category: WhatsApp Marketing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d05/
 */
@ApiTags('D05 - Low Stock Owner Alert')
@ApiBearerAuth()
@Controller('api/whatsapp/stock-alert')
export class D05Controller {
  constructor(private readonly service: D05Service) {}

  /** POST /api/whatsapp/stock-alert/send — Send low stock alert */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD05Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/stock-alert/settings — Configure alert thresholds */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateD05Dto) {
    // TODO (D05): implement PUT /api/whatsapp/stock-alert/settings — Configure alert thresholds
        return { ok: true, endpoint: 'api/whatsapp/stock-alert/settings', args: { dto } };
  }

  /** GET /api/whatsapp/stock-alert/history — Alert send history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
