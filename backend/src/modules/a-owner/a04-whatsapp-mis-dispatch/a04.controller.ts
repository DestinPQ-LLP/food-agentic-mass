import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A04Service } from './a04.service';
import { CreateA04Dto } from './dto/create-a04.dto';
import { UpdateA04Dto } from './dto/update-a04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A04 — WhatsApp MIS Dispatch
 *
 * Automatically composes and sends the owner a structured daily MIS report via WhatsApp at a scheduled time.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a04/
 */
@ApiTags('A04 - WhatsApp MIS Dispatch')
@ApiBearerAuth()
@Controller('api/owner/mis')
export class A04Controller {
  constructor(private readonly service: A04Service) {}

  /** POST /api/owner/mis/send — Trigger MIS WhatsApp send */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateA04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/owner/mis/preview — Preview today's MIS message */
  @Get('preview')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPreview(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/owner/mis/schedule — Update send schedule */
  @Put('schedule')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSchedule(@Body() dto: UpdateA04Dto) {
    // TODO (A04): implement PUT /api/owner/mis/schedule — Update send schedule
        return { ok: true, endpoint: 'api/owner/mis/schedule', args: { dto } };
  }
}
