import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I16Service } from './i16.service';
import { CreateI16Dto } from './dto/create-i16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I16 — Overtime Tracker
 *
 * Logs hours worked beyond standard shift and calculates overtime pay.
 *
 * Category: Staff  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i16/
 */
@ApiTags('I16 - Overtime Tracker')
@ApiBearerAuth()
@Controller('api/staff/overtime')
export class I16Controller {
  constructor(private readonly service: I16Service) {}

  /** POST /api/staff/overtime/log — Log overtime hours */
  @Post('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createLog(@Body() dto: CreateI16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/overtime/:staffId — Overtime by staff */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (I16): implement GET /api/staff/overtime/:staffId — Overtime by staff
        return { ok: true, endpoint: 'api/staff/overtime/:staffId', args: { staffId } };
  }

  /** GET /api/staff/overtime/summary — Overtime summary for period */
  @Get('summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
