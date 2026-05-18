import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A11Service } from './a11.service';
import { CreateA11Dto } from './dto/create-a11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A11 — Weekly Business Summary
 *
 * Auto-generated 7-day summary covering sales, footfall, wastage, top items, and key alerts.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a11/
 */
@ApiTags('A11 - Weekly Business Summary')
@ApiBearerAuth()
@Controller('api/owner/weekly-summary')
export class A11Controller {
  constructor(private readonly service: A11Service) {}

  /** GET /api/owner/weekly-summary — This week's summary */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/weekly-summary/compare — This week vs last week */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/owner/weekly-summary/send — Send summary via WhatsApp */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateA11Dto) {
    return this.service.create(dto);
  }
}
