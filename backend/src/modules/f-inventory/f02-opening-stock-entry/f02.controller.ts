import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F02Service } from './f02.service';
import { CreateF02Dto } from './dto/create-f02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F02 — Opening Stock Entry
 *
 * Daily screen for entering beginning-of-day stock quantities for each inventory item.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f02/
 */
@ApiTags('F02 - Opening Stock Entry')
@ApiBearerAuth()
@Controller('api/inventory/stock/opening')
export class F02Controller {
  constructor(private readonly service: F02Service) {}

  /** POST /api/inventory/stock/opening — Submit opening stock */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/stock/opening/today — Today's opening stock */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/stock/opening/history — Opening stock history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
