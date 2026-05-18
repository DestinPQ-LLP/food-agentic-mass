import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I10Service } from './i10.service';
import { CreateI10Dto } from './dto/create-i10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I10 — Staff WhatsApp Alerts
 *
 * Sends WhatsApp messages to staff: shift reminders, task assignments, and attendance alerts.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i10/
 */
@ApiTags('I10 - Staff WhatsApp Alerts')
@ApiBearerAuth()
@Controller('api/staff/whatsapp')
export class I10Controller {
  constructor(private readonly service: I10Service) {}

  /** POST /api/staff/whatsapp/send — Send WhatsApp to staff */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateI10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/whatsapp/templates — Message templates */
  @Get('templates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/staff/whatsapp/log — Send history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
