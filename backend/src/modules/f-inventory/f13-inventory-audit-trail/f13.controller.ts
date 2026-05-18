import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F13Service } from './f13.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F13 — Inventory Audit Trail
 *
 * Complete log of all stock changes: purchases, adjustments, wastage, and transfers with user and timestamp.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f13/
 */
@ApiTags('F13 - Inventory Audit Trail')
@ApiBearerAuth()
@Controller('api/inventory/audit')
export class F13Controller {
  constructor(private readonly service: F13Service) {}

  /** GET /api/inventory/audit — Full audit trail */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/audit/:itemId — Audit trail for a specific item */
  @Get(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByItemId(@Param('itemId') itemId: string) {
    // TODO (F13): implement GET /api/inventory/audit/:itemId — Audit trail for a specific item
        return { ok: true, endpoint: 'api/inventory/audit/:itemId', args: { itemId } };
  }

  /** GET /api/inventory/audit/user/:userId — Audit trail by user */
  @Get('user/:userId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUserByUserId(@Param('userId') userId: string) {
    // TODO (F13): implement GET /api/inventory/audit/user/:userId — Audit trail by user
        return { ok: true, endpoint: 'api/inventory/audit/user/:userId', args: { userId } };
  }
}
