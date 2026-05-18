import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A09Service } from './a09.service';
import { UpdateA09Dto } from './dto/update-a09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A09 — Low Stock Alert Centre
 *
 * Consolidated view of all inventory items currently below their reorder threshold.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a09/
 */
@ApiTags('A09 - Low Stock Alert Centre')
@ApiBearerAuth()
@Controller('api/owner/low-stock')
export class A09Controller {
  constructor(private readonly service: A09Service) {}

  /** GET /api/owner/low-stock — All items below reorder level */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/owner/low-stock/:itemId/acknowledge — Acknowledge alert */
  @Put(':itemId/acknowledge')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByItemIdAcknowledge(@Param('itemId') itemId: string, @Body() dto: UpdateA09Dto) {
    // TODO (A09): implement PUT /api/owner/low-stock/:itemId/acknowledge — Acknowledge alert
        return { ok: true, endpoint: 'api/owner/low-stock/:itemId/acknowledge', args: { itemId, dto } };
  }

  /** GET /api/owner/low-stock/critical — Items at zero stock */
  @Get('critical')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCritical(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
