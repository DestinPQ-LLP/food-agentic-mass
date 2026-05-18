import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D14Service } from './d14.service';
import { CreateD14Dto } from './dto/create-d14.dto';
import { UpdateD14Dto } from './dto/update-d14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D14 — Complaint Escalation Alert
 *
 * Immediately notifies the owner via WhatsApp when a customer submits a 1- or 2-star rating.
 *
 * Category: WhatsApp Marketing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d14/
 */
@ApiTags('D14 - Complaint Escalation Alert')
@ApiBearerAuth()
@Controller('api/whatsapp/escalation')
export class D14Controller {
  constructor(private readonly service: D14Service) {}

  /** POST /api/whatsapp/escalation/send — Send escalation alert */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD14Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/escalation/settings — Set escalation threshold */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateD14Dto) {
    // TODO (D14): implement PUT /api/whatsapp/escalation/settings — Set escalation threshold
        return { ok: true, endpoint: 'api/whatsapp/escalation/settings', args: { dto } };
  }

  /** GET /api/whatsapp/escalation/log — Escalation history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
