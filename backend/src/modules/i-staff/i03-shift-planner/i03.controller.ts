import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I03Service } from './i03.service';
import { CreateI03Dto } from './dto/create-i03.dto';
import { UpdateI03Dto } from './dto/update-i03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I03 — Shift Planner
 *
 * Creates and publishes weekly shift schedules assigning staff to shifts and roles.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i03/
 */
@ApiTags('I03 - Shift Planner')
@ApiBearerAuth()
@Controller('api/staff/shifts')
export class I03Controller {
  constructor(private readonly service: I03Service) {}

  /** POST /api/staff/shifts — Create shift */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI03Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/shifts/week — Weekly shift schedule */
  @Get('week')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getWeek(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/staff/shifts/:id — Update shift */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateI03Dto) {
    return this.service.update(id, dto);
  }
}
