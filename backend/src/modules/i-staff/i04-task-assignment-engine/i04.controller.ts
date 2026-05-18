import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I04Service } from './i04.service';
import { CreateI04Dto } from './dto/create-i04.dto';
import { UpdateI04Dto } from './dto/update-i04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I04 — Task Assignment Engine
 *
 * Manager assigns specific tasks to staff with due time and priority.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i04/
 */
@ApiTags('I04 - Task Assignment Engine')
@ApiBearerAuth()
@Controller('api/staff/tasks')
export class I04Controller {
  constructor(private readonly service: I04Service) {}

  /** POST /api/staff/tasks — Create task */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/tasks/today — Tasks for today */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/staff/tasks/:id/assign — Assign task to staff */
  @Put(':id/assign')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdAssign(@Param('id') id: string, @Body() dto: UpdateI04Dto) {
    return this.service.update(id, dto);
  }
}
