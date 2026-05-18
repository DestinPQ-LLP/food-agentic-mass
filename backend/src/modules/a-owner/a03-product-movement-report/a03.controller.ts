import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A03Service } from './a03.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A03 — Product Movement Report
 *
 * Shows which menu items are selling fast, slow, or stagnant across any date range.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a03/
 */
@ApiTags('A03 - Product Movement Report')
@ApiBearerAuth()
@Controller('api/owner/product-movement')
export class A03Controller {
  constructor(private readonly service: A03Service) {}

  /** GET /api/owner/product-movement — Item sales volume and revenue */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/product-movement/slow — Slow-moving items list */
  @Get('slow')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSlow(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/product-movement/top — Top 10 items by revenue */
  @Get('top')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTop(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
