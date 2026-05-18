import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B18Service } from './b18.service';
import { CreateB18Dto } from './dto/create-b18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B18 — Offline Order Queue
 *
 * Queues orders locally in the browser when internet is down and syncs to server when connectivity returns.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b18/
 */
@ApiTags('B18 - Offline Order Queue')
@ApiBearerAuth()
@Controller('api/pos/orders')
export class B18Controller {
  constructor(private readonly service: B18Service) {}

  /** POST /api/pos/orders/sync — Sync offline orders to server */
  @Post('sync')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSync(@Body() dto: CreateB18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/orders/sync/status — Check sync status */
  @Get('sync/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSyncStatus(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/orders/offline-queue — List locally queued orders */
  @Get('offline-queue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOfflineQueue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
