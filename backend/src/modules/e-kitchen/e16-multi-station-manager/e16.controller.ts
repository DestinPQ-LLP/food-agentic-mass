import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E16Service } from './e16.service';
import { UpdateE16Dto } from './dto/update-e16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E16 — Multi-Station Manager
 *
 * Organises the kitchen into stations (dosa, idli, beverages) each with their own queue.
 *
 * Category: Kitchen  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e16/
 */
@ApiTags('E16 - Multi-Station Manager')
@ApiBearerAuth()
@Controller('api/kitchen')
export class E16Controller {
  constructor(private readonly service: E16Service) {}

  /** GET /api/kitchen/stations — List all stations */
  @Get('stations')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStations(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/orders/:id/station — Assign order item to station */
  @Put('orders/:id/station')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateOrdersByIdStation(@Param('id') id: string, @Body() dto: UpdateE16Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/stations/:id/queue — Queue for a specific station */
  @Get('stations/:id/queue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStationsByIdQueue(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
