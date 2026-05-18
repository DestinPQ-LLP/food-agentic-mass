import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K04Service } from './k04.service';
import { CreateK04Dto } from './dto/create-k04.dto';
import { UpdateK04Dto } from './dto/update-k04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K04 — Delivery Zone Config
 *
 * Defines delivery zones with boundary, delivery charge, and minimum order.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k04/
 */
@ApiTags('K04 - Delivery Zone Config')
@ApiBearerAuth()
@Controller('api/delivery/zones')
export class K04Controller {
  constructor(private readonly service: K04Service) {}

  /** POST /api/delivery/zones — Create delivery zone */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateK04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/zones — List zones */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/zones/:id — Update zone */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateK04Dto) {
    return this.service.update(id, dto);
  }
}
