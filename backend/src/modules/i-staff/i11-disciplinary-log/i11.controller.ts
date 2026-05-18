import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I11Service } from './i11.service';
import { CreateI11Dto } from './dto/create-i11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I11 — Disciplinary Log
 *
 * Records warnings, incidents, and disciplinary actions linked to staff profiles.
 *
 * Category: Staff  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i11/
 */
@ApiTags('I11 - Disciplinary Log')
@ApiBearerAuth()
@Controller('api/staff/disciplinary')
export class I11Controller {
  constructor(private readonly service: I11Service) {}

  /** POST /api/staff/disciplinary — Log disciplinary action */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/disciplinary/:staffId — Disciplinary records for staff */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (I11): implement GET /api/staff/disciplinary/:staffId — Disciplinary records for staff
        return { ok: true, endpoint: 'api/staff/disciplinary/:staffId', args: { staffId } };
  }

  /** GET /api/staff/disciplinary/recent — Recent disciplinary actions */
  @Get('recent')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRecent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
