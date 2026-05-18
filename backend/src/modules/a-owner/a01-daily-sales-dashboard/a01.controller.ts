import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A01Service } from './a01.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A01 — Daily Sales Dashboard
 *
 * Real-time view of today's total revenue, order count, and top-selling items for the owner.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a01/
 */
@ApiTags('A01 - Daily Sales Dashboard')
@ApiBearerAuth()
@Controller('api/owner/daily-sales')
export class A01Controller {
  constructor(private readonly service: A01Service) {}

  /** GET /api/owner/daily-sales — Fetch today's sales summary */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/daily-sales/items — Item-wise sales breakdown */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/daily-sales/hourly — Hourly revenue timeline */
  @Get('hourly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHourly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
