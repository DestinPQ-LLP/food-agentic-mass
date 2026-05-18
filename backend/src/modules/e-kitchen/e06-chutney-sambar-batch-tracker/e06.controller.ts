import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E06Service } from './e06.service';
import { CreateE06Dto } from './dto/create-e06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E06 — Chutney/Sambar Batch Tracker
 *
 * Tracks preparation and consumption of chutneys and sambar throughout the day.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e06/
 */
@ApiTags('E06 - Chutney/Sambar Batch Tracker')
@ApiBearerAuth()
@Controller('api/kitchen/condiments')
export class E06Controller {
  constructor(private readonly service: E06Service) {}

  /** POST /api/kitchen/condiments/batch — Log a condiment batch prepared */
  @Post('batch')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createBatch(@Body() dto: CreateE06Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/condiments/status — Current condiment stock level */
  @Get('status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStatus(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/condiments/log — Batch preparation history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
