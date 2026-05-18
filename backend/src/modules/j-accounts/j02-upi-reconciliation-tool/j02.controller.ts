import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J02Service } from './j02.service';
import { CreateJ02Dto } from './dto/create-j02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J02 — UPI Reconciliation Tool
 *
 * Matches UPI settlement amounts from the payment app against system-recorded UPI orders.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j02/
 */
@ApiTags('J02 - UPI Reconciliation Tool')
@ApiBearerAuth()
@Controller('api/accounts/upi')
export class J02Controller {
  constructor(private readonly service: J02Service) {}

  /** POST /api/accounts/upi/reconcile — Submit UPI statement for reconciliation */
  @Post('reconcile')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createReconcile(@Body() dto: CreateJ02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/upi/unmatched — Unmatched UPI transactions */
  @Get('unmatched')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnmatched(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/upi/reconciliation-report — Reconciliation report */
  @Get('reconciliation-report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getReconciliationReport(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
