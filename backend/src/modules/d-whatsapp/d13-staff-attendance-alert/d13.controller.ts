import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D13Service } from './d13.service';
import { CreateD13Dto } from './dto/create-d13.dto';
import { UpdateD13Dto } from './dto/update-d13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D13 — Staff Attendance Alert
 *
 * Alerts the manager via WhatsApp when a staff member is late or absent at shift start.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d13/
 */
@ApiTags('D13 - Staff Attendance Alert')
@ApiBearerAuth()
@Controller('api/whatsapp/staff-alert')
export class D13Controller {
  constructor(private readonly service: D13Service) {}

  /** POST /api/whatsapp/staff-alert/send — Send attendance alert */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD13Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/staff-alert/settings — Configure shift start times */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateD13Dto) {
    // TODO (D13): implement PUT /api/whatsapp/staff-alert/settings — Configure shift start times
        return { ok: true, endpoint: 'api/whatsapp/staff-alert/settings', args: { dto } };
  }

  /** GET /api/whatsapp/staff-alert/log — Alert history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
