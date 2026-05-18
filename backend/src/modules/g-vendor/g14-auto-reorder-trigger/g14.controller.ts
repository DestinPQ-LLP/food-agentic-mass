import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G14Service } from './g14.service';
import { UpdateG14Dto } from './dto/update-g14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G14 — Auto-Reorder Trigger
 *
 * Automatically creates a purchase request when a material drops below its reorder level.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g14/
 */
@ApiTags('G14 - Auto-Reorder Trigger')
@ApiBearerAuth()
@Controller('api/vendors/auto-reorder')
export class G14Controller {
  constructor(private readonly service: G14Service) {}

  /** GET /api/vendors/auto-reorder/triggered — Auto-triggered reorder requests */
  @Get('triggered')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTriggered(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/vendors/auto-reorder/settings — Enable/disable auto-reorder */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateG14Dto) {
    // TODO (G14): implement PUT /api/vendors/auto-reorder/settings — Enable/disable auto-reorder
        return { ok: true, endpoint: 'api/vendors/auto-reorder/settings', args: { dto } };
  }

  /** GET /api/vendors/auto-reorder/log — Trigger history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
