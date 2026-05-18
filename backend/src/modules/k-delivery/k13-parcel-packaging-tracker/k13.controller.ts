import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K13Service } from './k13.service';
import { CreateK13Dto } from './dto/create-k13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K13 — Parcel Packaging Tracker
 *
 * Logs which packaging was used per delivery order to track packaging consumption.
 *
 * Category: Delivery  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k13/
 */
@ApiTags('K13 - Parcel Packaging Tracker')
@ApiBearerAuth()
@Controller('api/delivery/packaging')
export class K13Controller {
  constructor(private readonly service: K13Service) {}

  /** POST /api/delivery/packaging/log — Log packaging used */
  @Post('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createLog(@Body() dto: CreateK13Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/packaging/consumption — Packaging consumption by period */
  @Get('consumption')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getConsumption(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/delivery/packaging/stock — Current packaging stock */
  @Get('stock')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStock(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
