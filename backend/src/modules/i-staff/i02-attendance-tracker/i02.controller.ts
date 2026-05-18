import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I02Service } from './i02.service';
import { CreateI02Dto } from './dto/create-i02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I02 — Attendance Tracker
 *
 * Daily attendance logging with clock-in and clock-out times per staff member.
 *
 * Category: Staff  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i02/
 */
@ApiTags('I02 - Attendance Tracker')
@ApiBearerAuth()
@Controller('api/staff/attendance')
export class I02Controller {
  constructor(private readonly service: I02Service) {}

  /** POST /api/staff/attendance/clock-in — Clock in a staff member */
  @Post('clock-in')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClockIn(@Body() dto: CreateI02Dto) {
    return this.service.create(dto);
  }

  /** POST /api/staff/attendance/clock-out — Clock out a staff member */
  @Post('clock-out')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClockOut(@Body() dto: CreateI02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/attendance/:date — Attendance for a date */
  @Get(':date')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByDate(@Param('date') date: string) {
    // TODO (I02): implement GET /api/staff/attendance/:date — Attendance for a date
        return { ok: true, endpoint: 'api/staff/attendance/:date', args: { date } };
  }
}
