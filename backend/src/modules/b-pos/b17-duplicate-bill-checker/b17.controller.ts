import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B17Service } from './b17.service';
import { CreateB17Dto } from './dto/create-b17.dto';
import { UpdateB17Dto } from './dto/update-b17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B17 — Duplicate Bill Checker
 *
 * Detects potential duplicate orders based on same item set, time window, and customer within a configurable window.
 *
 * Category: POS & Billing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b17/
 */
@ApiTags('B17 - Duplicate Bill Checker')
@ApiBearerAuth()
@Controller('api/pos/orders')
export class B17Controller {
  constructor(private readonly service: B17Service) {}

  /** GET /api/pos/orders/duplicates — Potential duplicate orders */
  @Get('duplicates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDuplicates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/pos/orders/:id/mark-duplicate — Flag as duplicate */
  @Post(':id/mark-duplicate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdMarkDuplicate(@Param('id') id: string, @Body() dto: CreateB17Dto) {
    // TODO (B17): implement POST /api/pos/orders/:id/mark-duplicate — Flag as duplicate
        return { ok: true, endpoint: 'api/pos/orders/:id/mark-duplicate', args: { id, dto } };
  }

  /** PUT /api/pos/orders/duplicates/settings — Configure detection window */
  @Put('duplicates/settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateDuplicatesSettings(@Body() dto: UpdateB17Dto) {
    // TODO (B17): implement PUT /api/pos/orders/duplicates/settings — Configure detection window
        return { ok: true, endpoint: 'api/pos/orders/duplicates/settings', args: { dto } };
  }
}
