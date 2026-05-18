import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E04Service } from './e04.service';
import { CreateE04Dto } from './dto/create-e04.dto';
import { UpdateE04Dto } from './dto/update-e04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E04 — Production Batch Planner
 *
 * Daily planning tool for deciding how much batter, chutney, sambar, and other prep to make.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e04/
 */
@ApiTags('E04 - Production Batch Planner')
@ApiBearerAuth()
@Controller('api/kitchen/batches')
export class E04Controller {
  constructor(private readonly service: E04Service) {}

  /** POST /api/kitchen/batches — Create a production batch plan */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateE04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/batches/today — Today's batch plans */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/batches/:id — Update batch quantities */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateE04Dto) {
    return this.service.update(id, dto);
  }
}
