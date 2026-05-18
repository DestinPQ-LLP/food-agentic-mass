import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K14Service } from './k14.service';
import { CreateK14Dto } from './dto/create-k14.dto';
import { UpdateK14Dto } from './dto/update-k14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K14 — Bulk Delivery Planner
 *
 * Plans logistics for large catering or event deliveries with route and timing.
 *
 * Category: Delivery  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k14/
 */
@ApiTags('K14 - Bulk Delivery Planner')
@ApiBearerAuth()
@Controller('api/delivery/bulk-plans')
export class K14Controller {
  constructor(private readonly service: K14Service) {}

  /** POST /api/delivery/bulk-plans — Create bulk delivery plan */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateK14Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/bulk-plans — List bulk delivery plans */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/bulk-plans/:id/status — Update plan status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateK14Dto) {
    return this.service.update(id, dto);
  }
}
