import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F15Service } from './f15.service';
import { CreateF15Dto } from './dto/create-f15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F15 — Semi-Prepared Goods Tracker
 *
 * Tracks batter, chutney, and sambar as separate stock lines between production and sale.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f15/
 */
@ApiTags('F15 - Semi-Prepared Goods Tracker')
@ApiBearerAuth()
@Controller('api/inventory/semi-prep')
export class F15Controller {
  constructor(private readonly service: F15Service) {}

  /** POST /api/inventory/semi-prep/entry — Log semi-prep stock entry */
  @Post('entry')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEntry(@Body() dto: CreateF15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/semi-prep/current — Current semi-prep levels */
  @Get('current')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCurrent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/semi-prep/log — Semi-prep stock history */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
