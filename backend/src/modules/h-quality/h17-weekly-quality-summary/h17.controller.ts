import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H17Service } from './h17.service';
import { CreateH17Dto } from './dto/create-h17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H17 — Weekly Quality Summary
 *
 * Auto-generated weekly report of ratings, complaints, compliments, and checklist compliance.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h17/
 */
@ApiTags('H17 - Weekly Quality Summary')
@ApiBearerAuth()
@Controller('api/quality/summary/weekly')
export class H17Controller {
  constructor(private readonly service: H17Service) {}

  /** GET /api/quality/summary/weekly — Weekly quality summary */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/quality/summary/weekly/send — Send summary to owner */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateH17Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/summary/weekly/history — Past weekly summaries */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
