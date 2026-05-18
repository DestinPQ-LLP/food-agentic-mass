import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N14Service } from './n14.service';
import { CreateN14Dto } from './dto/create-n14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N14 — Franchise Management Module
 *
 * Manages franchise-specific configurations: royalty tracking, SOP compliance, and audit scores.
 *
 * Category: Multi-Branch  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n14/
 */
@ApiTags('N14 - Franchise Management Module')
@ApiBearerAuth()
@Controller('api/branches/franchise')
export class N14Controller {
  constructor(private readonly service: N14Service) {}

  /** GET /api/branches/franchise/royalties — Royalty calculations per franchise */
  @Get('royalties')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRoyalties(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/branches/franchise/audit — Submit franchise audit score */
  @Post('audit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createAudit(@Body() dto: CreateN14Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches/franchise/compliance — SOP compliance per franchise */
  @Get('compliance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompliance(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
