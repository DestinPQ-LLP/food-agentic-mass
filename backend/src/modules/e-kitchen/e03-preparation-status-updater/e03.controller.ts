import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E03Service } from './e03.service';
import { UpdateE03Dto } from './dto/update-e03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E03 — Preparation Status Updater
 *
 * Granular status updates per order item: received, preparing, ready, served, wasted.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e03/
 */
@ApiTags('E03 - Preparation Status Updater')
@ApiBearerAuth()
@Controller('api/kitchen/items')
export class E03Controller {
  constructor(private readonly service: E03Service) {}

  /** PUT /api/kitchen/items/:id/status — Update item preparation status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateE03Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/items/status-summary — Count by status */
  @Get('status-summary')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStatusSummary(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/items/in-progress — Items currently being prepared */
  @Get('in-progress')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getInProgress(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
