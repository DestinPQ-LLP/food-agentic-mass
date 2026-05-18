import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E17Service } from './e17.service';
import { UpdateE17Dto } from './dto/update-e17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E17 — Order Priority Flag
 *
 * Marks specific orders as urgent (e.g., VIP, special request) so kitchen handles them first.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e17/
 */
@ApiTags('E17 - Order Priority Flag')
@ApiBearerAuth()
@Controller('api/kitchen/orders')
export class E17Controller {
  constructor(private readonly service: E17Service) {}

  /** PUT /api/kitchen/orders/:id/priority — Set order priority */
  @Put(':id/priority')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdPriority(@Param('id') id: string, @Body() dto: UpdateE17Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/orders/priority — All priority orders */
  @Get('priority')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPriority(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/orders/priority/count — Count of priority orders */
  @Get('priority/count')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPriorityCount(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
