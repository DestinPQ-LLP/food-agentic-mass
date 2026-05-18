import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F01Service } from './f01.service';
import { CreateF01Dto } from './dto/create-f01.dto';
import { UpdateF01Dto } from './dto/update-f01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F01 — Raw Material Master
 *
 * Master list of all raw materials with name, unit, reorder level, and vendor mapping.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f01/
 */
@ApiTags('F01 - Raw Material Master')
@ApiBearerAuth()
@Controller('api/inventory/items')
export class F01Controller {
  constructor(private readonly service: F01Service) {}

  /** POST /api/inventory/items — Create inventory item */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/items — List all items */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/inventory/items/:id — Update item */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateF01Dto) {
    return this.service.update(id, dto);
  }
}
