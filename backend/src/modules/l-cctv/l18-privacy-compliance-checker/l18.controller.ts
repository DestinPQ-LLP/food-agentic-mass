import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { L18Service } from './l18.service';
import { CreateL18Dto } from './dto/create-l18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * L18 — Privacy Compliance Checker
 *
 * Validates CCTV deployment against a configurable privacy checklist (signage, retention, consent).
 *
 * Category: CCTV  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/l18/
 */
@ApiTags('L18 - Privacy Compliance Checker')
@ApiBearerAuth()
@Controller('api/cctv/privacy')
export class L18Controller {
  constructor(private readonly service: L18Service) {}

  /** GET /api/cctv/privacy/checklist — Privacy compliance checklist */
  @Get('checklist')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getChecklist(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/cctv/privacy/checklist/submit — Submit compliance answers */
  @Post('checklist/submit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createChecklistSubmit(@Body() dto: CreateL18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/cctv/privacy/status — Current compliance status */
  @Get('status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStatus(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
