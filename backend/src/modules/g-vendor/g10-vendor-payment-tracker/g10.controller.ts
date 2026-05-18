import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G10Service } from './g10.service';
import { CreateG10Dto } from './dto/create-g10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G10 — Vendor Payment Tracker
 *
 * Records payments made to vendors and tracks outstanding balances.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g10/
 */
@ApiTags('G10 - Vendor Payment Tracker')
@ApiBearerAuth()
@Controller('api/vendors/payments')
export class G10Controller {
  constructor(private readonly service: G10Service) {}

  /** POST /api/vendors/payments — Record vendor payment */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/payments/:vendorId — Payments by vendor */
  @Get(':vendorId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByVendorId(@Param('vendorId') vendorId: string) {
    // TODO (G10): implement GET /api/vendors/payments/:vendorId — Payments by vendor
        return { ok: true, endpoint: 'api/vendors/payments/:vendorId', args: { vendorId } };
  }

  /** GET /api/vendors/payments/outstanding — Outstanding payables */
  @Get('outstanding')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOutstanding(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
