import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D01Service } from './d01.service';
import { CreateD01Dto } from './dto/create-d01.dto';
import { UpdateD01Dto } from './dto/update-d01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D01 — Daily Owner MIS Bot
 *
 * Automatically sends the owner a WhatsApp message every morning with prior-day KPIs.
 *
 * Category: WhatsApp Marketing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d01/
 */
@ApiTags('D01 - Daily Owner MIS Bot')
@ApiBearerAuth()
@Controller('api/whatsapp/mis')
export class D01Controller {
  constructor(private readonly service: D01Service) {}

  /** POST /api/whatsapp/mis/send — Send MIS now */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/mis/preview — Preview today's MIS */
  @Get('preview')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPreview(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/mis/schedule — Set MIS send time */
  @Put('schedule')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSchedule(@Body() dto: UpdateD01Dto) {
    // TODO (D01): implement PUT /api/whatsapp/mis/schedule — Set MIS send time
        return { ok: true, endpoint: 'api/whatsapp/mis/schedule', args: { dto } };
  }
}
