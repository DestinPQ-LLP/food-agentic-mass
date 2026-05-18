import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E07Service } from './e07.service';
import { CreateE07Dto } from './dto/create-e07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E07 — Wastage Entry Screen
 *
 * Kitchen staff logs food wastage by item and reason code to build a wastage history.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e07/
 */
@ApiTags('E07 - Wastage Entry Screen')
@ApiBearerAuth()
@Controller('api/kitchen/wastage')
export class E07Controller {
  constructor(private readonly service: E07Service) {}

  /** POST /api/kitchen/wastage — Log a wastage entry */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateE07Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/wastage/today — Today's wastage log */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/kitchen/wastage/items — Wastage totals by item */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
