import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J18Service } from './j18.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J18 — Accounts Audit Trail
 *
 * Immutable log of all financial record changes with user, timestamp, and before/after values.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j18/
 */
@ApiTags('J18 - Accounts Audit Trail')
@ApiBearerAuth()
@Controller('api/accounts/audit')
export class J18Controller {
  constructor(private readonly service: J18Service) {}

  /** GET /api/accounts/audit — Full accounts audit log */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/audit/:entityType — Audit log by entity type */
  @Get(':entityType')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByEntityType(@Param('entityType') entityType: string) {
    // TODO (J18): implement GET /api/accounts/audit/:entityType — Audit log by entity type
        return { ok: true, endpoint: 'api/accounts/audit/:entityType', args: { entityType } };
  }

  /** GET /api/accounts/audit/user/:userId — Audit log by user */
  @Get('user/:userId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUserByUserId(@Param('userId') userId: string) {
    // TODO (J18): implement GET /api/accounts/audit/user/:userId — Audit log by user
        return { ok: true, endpoint: 'api/accounts/audit/user/:userId', args: { userId } };
  }
}
