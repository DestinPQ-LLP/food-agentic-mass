import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H11Service } from './h11.service';
import { CreateH11Dto } from './dto/create-h11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H11 — Hygiene Checklist Manager
 *
 * Daily hygiene checklist for kitchen and counter with completion tracking per shift.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h11/
 */
@ApiTags('H11 - Hygiene Checklist Manager')
@ApiBearerAuth()
@Controller('api/quality/hygiene/checklist')
export class H11Controller {
  constructor(private readonly service: H11Service) {}

  /** GET /api/quality/hygiene/checklist — Today's hygiene checklist */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/quality/hygiene/checklist/submit — Submit checklist */
  @Post('submit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSubmit(@Body() dto: CreateH11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/hygiene/checklist/history — Checklist completion history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
