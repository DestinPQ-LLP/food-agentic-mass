import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I13Service } from './i13.service';
import { CreateI13Dto } from './dto/create-i13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I13 — Onboarding Checklist
 *
 * Step-by-step onboarding checklist for new staff covering documents, training, and system access.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i13/
 */
@ApiTags('I13 - Onboarding Checklist')
@ApiBearerAuth()
@Controller('api/staff/onboarding')
export class I13Controller {
  constructor(private readonly service: I13Service) {}

  /** GET /api/staff/onboarding/checklist — Onboarding checklist template */
  @Get('checklist')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getChecklist(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/staff/onboarding/:staffId/progress — Update onboarding progress */
  @Post(':staffId/progress')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByStaffIdProgress(@Param('staffId') staffId: string, @Body() dto: CreateI13Dto) {
    // TODO (I13): implement POST /api/staff/onboarding/:staffId/progress — Update onboarding progress
        return { ok: true, endpoint: 'api/staff/onboarding/:staffId/progress', args: { staffId, dto } };
  }

  /** GET /api/staff/onboarding/:staffId/status — Onboarding completion status */
  @Get(':staffId/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffIdStatus(@Param('staffId') staffId: string) {
    // TODO (I13): implement GET /api/staff/onboarding/:staffId/status — Onboarding completion status
        return { ok: true, endpoint: 'api/staff/onboarding/:staffId/status', args: { staffId } };
  }
}
