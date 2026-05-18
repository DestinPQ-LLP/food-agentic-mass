import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E08Service } from './e08.service';
import { UpdateE08Dto } from './dto/update-e08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E08 — Kitchen Hold/Cancel Flow
 *
 * Lets kitchen staff hold or cancel specific items with a reason, automatically notifying the counter.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e08/
 */
@ApiTags('E08 - Kitchen Hold/Cancel Flow')
@ApiBearerAuth()
@Controller('api/kitchen/items')
export class E08Controller {
  constructor(private readonly service: E08Service) {}

  /** PUT /api/kitchen/items/:id/hold — Put item on hold */
  @Put(':id/hold')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdHold(@Param('id') id: string, @Body() dto: UpdateE08Dto) {
    return this.service.update(id, dto);
  }

  /** PUT /api/kitchen/items/:id/cancel — Cancel item with reason */
  @Put(':id/cancel')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdCancel(@Param('id') id: string, @Body() dto: UpdateE08Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/items/held — All currently held items */
  @Get('held')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHeld(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
