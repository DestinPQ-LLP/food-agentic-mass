import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N08Service } from './n08.service';
import { CreateN08Dto } from './dto/create-n08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N08 — Multi-Branch Vendor Management
 *
 * Shared vendor master with branch-specific pricing and order tracking.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n08/
 */
@ApiTags('N08 - Multi-Branch Vendor Management')
@ApiBearerAuth()
@Controller('api/branches/vendors')
export class N08Controller {
  constructor(private readonly service: N08Service) {}

  /** GET /api/branches/vendors — Global vendor list */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/branches/vendors/:vendorId/purchase-orders — PO for specific branch */
  @Post(':vendorId/purchase-orders')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByVendorIdPurchaseOrders(@Param('vendorId') vendorId: string, @Body() dto: CreateN08Dto) {
    // TODO (N08): implement POST /api/branches/vendors/:vendorId/purchase-orders — PO for specific branch
        return { ok: true, endpoint: 'api/branches/vendors/:vendorId/purchase-orders', args: { vendorId, dto } };
  }

  /** GET /api/branches/vendors/spend/consolidated — Consolidated vendor spend */
  @Get('spend/consolidated')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSpendConsolidated(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
