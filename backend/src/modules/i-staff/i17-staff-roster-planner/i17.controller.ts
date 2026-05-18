import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I17Service } from './i17.service';
import { CreateI17Dto } from './dto/create-i17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I17 — Staff Roster Planner
 *
 * Weekly roster view showing which staff are assigned to which shift, with coverage gaps highlighted.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i17/
 */
@ApiTags('I17 - Staff Roster Planner')
@ApiBearerAuth()
@Controller('api/staff/roster')
export class I17Controller {
  constructor(private readonly service: I17Service) {}

  /** GET /api/staff/roster/week — Weekly roster */
  @Get('week')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getWeek(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/staff/roster/assign — Assign staff to slot */
  @Post('assign')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAssign(@Body() dto: CreateI17Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/roster/gaps — Understaffed shifts */
  @Get('gaps')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getGaps(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
