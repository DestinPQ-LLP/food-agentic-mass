import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E10Service } from './e10.service';
import { UpdateE10Dto } from './dto/update-e10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E10 — Item Availability Toggle
 *
 * Allows kitchen to mark items as temporarily unavailable (e.g., batter finished) so POS reflects it.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e10/
 */
@ApiTags('E10 - Item Availability Toggle')
@ApiBearerAuth()
@Controller('api/kitchen/availability')
export class E10Controller {
  constructor(private readonly service: E10Service) {}

  /** PUT /api/kitchen/availability/:itemId — Toggle item availability */
  @Put(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByItemId(@Param('itemId') itemId: string, @Body() dto: UpdateE10Dto) {
    // TODO (E10): implement PUT /api/kitchen/availability/:itemId — Toggle item availability
        return { ok: true, endpoint: 'api/kitchen/availability/:itemId', args: { itemId, dto } };
  }

  /** GET /api/kitchen/availability — All items with availability status */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/availability/unavailable — Currently unavailable items */
  @Get('unavailable')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnavailable(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
