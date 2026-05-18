import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J10Service } from './j10.service';
import { CreateJ10Dto } from './dto/create-j10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J10 — Vendor Payment Ledger
 *
 * Tracks all payables to vendors: invoices, payments made, and outstanding balances.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j10/
 */
@ApiTags('J10 - Vendor Payment Ledger')
@ApiBearerAuth()
@Controller('api/accounts/payables')
export class J10Controller {
  constructor(private readonly service: J10Service) {}

  /** GET /api/accounts/payables/:vendorId — Payables by vendor */
  @Get(':vendorId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByVendorId(@Param('vendorId') vendorId: string) {
    // TODO (J10): implement GET /api/accounts/payables/:vendorId — Payables by vendor
        return { ok: true, endpoint: 'api/accounts/payables/:vendorId', args: { vendorId } };
  }

  /** POST /api/accounts/payables/pay — Record vendor payment */
  @Post('pay')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createPay(@Body() dto: CreateJ10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/payables/total — Total outstanding payables */
  @Get('total')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTotal(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
