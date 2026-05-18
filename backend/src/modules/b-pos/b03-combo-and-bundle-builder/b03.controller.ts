import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B03Service } from './b03.service';
import { CreateB03Dto } from './dto/create-b03.dto';
import { UpdateB03Dto } from './dto/update-b03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B03 — Combo & Bundle Builder
 *
 * Admin interface to create combos (e.g., Idli + Sambar + Coffee) with a bundled price.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b03/
 */
@ApiTags('B03 - Combo & Bundle Builder')
@ApiBearerAuth()
@Controller('api/pos/combos')
export class B03Controller {
  constructor(private readonly service: B03Service) {}

  /** POST /api/pos/combos — Create a combo */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB03Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/combos — List all combos */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/pos/combos/:id — Edit combo */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateB03Dto) {
    return this.service.update(id, dto);
  }
}
