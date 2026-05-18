import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F08Service } from './f08.service';
import { UpdateF08Dto } from './dto/update-f08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F08 — Expiry & Freshness Tracker
 *
 * Tracks expiry dates for perishable items and alerts when approaching or past expiry.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f08/
 */
@ApiTags('F08 - Expiry & Freshness Tracker')
@ApiBearerAuth()
@Controller('api/inventory/items')
export class F08Controller {
  constructor(private readonly service: F08Service) {}

  /** PUT /api/inventory/items/:id/expiry — Set expiry date for a batch */
  @Put(':id/expiry')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdExpiry(@Param('id') id: string, @Body() dto: UpdateF08Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/inventory/items/expiring-soon — Items expiring within N days */
  @Get('expiring-soon')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExpiringSoon(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/items/expired — Expired items */
  @Get('expired')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExpired(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
