import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F18Service } from './f18.service';
import { CreateF18Dto } from './dto/create-f18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F18 — Mobile Stock Entry App
 *
 * Mobile-friendly interface for staff to enter stock counts from the storage room.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f18/
 */
@ApiTags('F18 - Mobile Stock Entry App')
@ApiBearerAuth()
@Controller('api/inventory/mobile')
export class F18Controller {
  constructor(private readonly service: F18Service) {}

  /** POST /api/inventory/mobile/count — Submit mobile stock count */
  @Post('count')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCount(@Body() dto: CreateF18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/mobile/items — Items for mobile entry */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/mobile/pending — Pending mobile submissions */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
