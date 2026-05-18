import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B10Service } from './b10.service';
import { CreateB10Dto } from './dto/create-b10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B10 — Daily Sales Reconciliation
 *
 * End-of-day screen for cashiers to tally cash-in-hand against system-recorded cash orders.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b10/
 */
@ApiTags('B10 - Daily Sales Reconciliation')
@ApiBearerAuth()
@Controller('api/pos/reconciliation')
export class B10Controller {
  constructor(private readonly service: B10Service) {}

  /** GET /api/pos/reconciliation/today — Expected vs actual cash */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/pos/reconciliation/close — Submit closing reconciliation */
  @Post('close')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClose(@Body() dto: CreateB10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/reconciliation/history — Past reconciliation logs */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
