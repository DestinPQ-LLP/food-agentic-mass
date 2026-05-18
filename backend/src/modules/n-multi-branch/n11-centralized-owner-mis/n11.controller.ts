import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N11Service } from './n11.service';
import { CreateN11Dto } from './dto/create-n11.dto';
import { UpdateN11Dto } from './dto/update-n11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N11 — Centralized Owner MIS
 *
 * Single WhatsApp MIS combining KPIs from all outlets for the owner.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n11/
 */
@ApiTags('N11 - Centralized Owner MIS')
@ApiBearerAuth()
@Controller('api/branches/mis')
export class N11Controller {
  constructor(private readonly service: N11Service) {}

  /** GET /api/branches/mis/consolidated — Consolidated MIS data */
  @Get('consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/branches/mis/send — Send consolidated MIS */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateN11Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/branches/mis/schedule — Schedule consolidated MIS */
  @Put('schedule')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSchedule(@Body() dto: UpdateN11Dto) {
    // TODO (N11): implement PUT /api/branches/mis/schedule — Schedule consolidated MIS
        return { ok: true, endpoint: 'api/branches/mis/schedule', args: { dto } };
  }
}
