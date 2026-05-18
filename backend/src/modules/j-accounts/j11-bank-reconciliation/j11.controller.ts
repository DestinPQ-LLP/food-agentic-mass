import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J11Service } from './j11.service';
import { CreateJ11Dto } from './dto/create-j11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J11 — Bank Reconciliation
 *
 * Matches bank statement credits and debits to system transactions.
 *
 * Category: Accounts  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j11/
 */
@ApiTags('J11 - Bank Reconciliation')
@ApiBearerAuth()
@Controller('api/accounts/bank')
export class J11Controller {
  constructor(private readonly service: J11Service) {}

  /** POST /api/accounts/bank/reconcile — Upload bank statement */
  @Post('reconcile')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createReconcile(@Body() dto: CreateJ11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/bank/unmatched — Unmatched bank transactions */
  @Get('unmatched')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnmatched(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/bank/reconciliation-report — Reconciliation report */
  @Get('reconciliation-report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReconciliationReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
