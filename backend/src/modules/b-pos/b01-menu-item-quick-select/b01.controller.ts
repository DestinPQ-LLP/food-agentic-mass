import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B01Service } from './b01.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B01 — Menu Item Quick Select
 *
 * Touch-optimised grid of menu items allowing cashiers to add items to an order in one tap.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b01/
 */
@ApiTags('B01 - Menu Item Quick Select')
@ApiBearerAuth()
@Controller('api/pos/menu')
export class B01Controller {
  constructor(private readonly service: B01Service) {}

  /** GET /api/pos/menu — Active menu items grouped by category */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/menu/search — Search menu items */
  @Get('search')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSearch(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/menu/favourites — Frequently ordered items */
  @Get('favourites')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getFavourites(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
