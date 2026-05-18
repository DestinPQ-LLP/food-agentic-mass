import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N18Service } from './n18.service';
import { CreateN18Dto } from './dto/create-n18.dto';
import { UpdateN18Dto } from './dto/update-n18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N18 — Expansion Planning Dashboard
 *
 * Tracks new outlet setup progress with checklists, timelines, and capital tracking.
 *
 * Category: Multi-Branch  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n18/
 */
@ApiTags('N18 - Expansion Planning Dashboard')
@ApiBearerAuth()
@Controller('api/branches/expansion/plans')
export class N18Controller {
  constructor(private readonly service: N18Service) {}

  /** POST /api/branches/expansion/plans — Create expansion plan */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateN18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches/expansion/plans — List expansion plans */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/branches/expansion/plans/:id/progress — Update plan progress */
  @Put(':id/progress')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdProgress(@Param('id') id: string, @Body() dto: UpdateN18Dto) {
    return this.service.update(id, dto);
  }
}
