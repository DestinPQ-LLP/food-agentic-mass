import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I08Service } from './i08.service';
import { CreateI08Dto } from './dto/create-i08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I08 — Salary & Wage Calculator
 *
 * Calculates wages based on attendance, shift hours, and deductions.
 *
 * Category: Staff  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i08/
 */
@ApiTags('I08 - Salary & Wage Calculator')
@ApiBearerAuth()
@Controller('api/staff/salary')
export class I08Controller {
  constructor(private readonly service: I08Service) {}

  /** GET /api/staff/salary/calculate/:staffId — Calculate salary for period */
  @Get('calculate/:staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCalculateByStaffId(@Param('staffId') staffId: string) {
    // TODO (I08): implement GET /api/staff/salary/calculate/:staffId — Calculate salary for period
        return { ok: true, endpoint: 'api/staff/salary/calculate/:staffId', args: { staffId } };
  }

  /** POST /api/staff/salary/pay — Record salary payment */
  @Post('pay')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createPay(@Body() dto: CreateI08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/salary/history/:staffId — Salary payment history */
  @Get('history/:staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistoryByStaffId(@Param('staffId') staffId: string) {
    // TODO (I08): implement GET /api/staff/salary/history/:staffId — Salary payment history
        return { ok: true, endpoint: 'api/staff/salary/history/:staffId', args: { staffId } };
  }
}
