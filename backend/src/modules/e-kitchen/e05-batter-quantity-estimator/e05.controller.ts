import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E05Service } from './e05.service';
import { CreateE05Dto } from './dto/create-e05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E05 — Batter Quantity Estimator
 *
 * Estimates the quantity of idli/dosa batter required based on sales forecast and buffer stock.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e05/
 */
@ApiTags('E05 - Batter Quantity Estimator')
@ApiBearerAuth()
@Controller('api/kitchen/batter')
export class E05Controller {
  constructor(private readonly service: E05Service) {}

  /** GET /api/kitchen/batter/estimate — Estimated batter for today */
  @Get('estimate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getEstimate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/kitchen/batter/override — Override estimate */
  @Post('override')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOverride(@Body() dto: CreateE05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/batter/history — Past batter usage log */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
