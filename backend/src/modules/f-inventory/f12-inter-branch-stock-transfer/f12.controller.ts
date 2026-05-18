import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F12Service } from './f12.service';
import { CreateF12Dto } from './dto/create-f12.dto';
import { UpdateF12Dto } from './dto/update-f12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F12 — Inter-Branch Stock Transfer
 *
 * Initiates and records stock transfers between outlets, updating both branch inventories.
 *
 * Category: Inventory  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f12/
 */
@ApiTags('F12 - Inter-Branch Stock Transfer')
@ApiBearerAuth()
@Controller('api/inventory/transfers')
export class F12Controller {
  constructor(private readonly service: F12Service) {}

  /** POST /api/inventory/transfers — Create transfer request */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF12Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/inventory/transfers/:id/approve — Approve transfer */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateF12Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/inventory/transfers — List all transfers */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
