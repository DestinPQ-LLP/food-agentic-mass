import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I15Service } from './i15.service';
import { UpdateI15Dto } from './dto/update-i15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I15 — Incentive & Bonus Calculator
 *
 * Calculates incentive payouts based on configurable performance criteria.
 *
 * Category: Staff  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i15/
 */
@ApiTags('I15 - Incentive & Bonus Calculator')
@ApiBearerAuth()
@Controller('api/staff/incentives')
export class I15Controller {
  constructor(private readonly service: I15Service) {}

  /** GET /api/staff/incentives/calculate — Calculate incentives for period */
  @Get('calculate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCalculate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/staff/incentives/rules — Update incentive rules */
  @Put('rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateRules(@Body() dto: UpdateI15Dto) {
    // TODO (I15): implement PUT /api/staff/incentives/rules — Update incentive rules
        return { ok: true, endpoint: 'api/staff/incentives/rules', args: { dto } };
  }

  /** GET /api/staff/incentives/history — Incentive payment history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
