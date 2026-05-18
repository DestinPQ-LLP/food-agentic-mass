import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A08Service } from './a08.service';
import { CreateA08Dto } from './dto/create-a08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A08 — Customer Footfall Overview
 *
 * Tracks estimated customer count per hour and day using manual entry or camera-based count.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a08/
 */
@ApiTags('A08 - Customer Footfall Overview')
@ApiBearerAuth()
@Controller('api/owner/footfall')
export class A08Controller {
  constructor(private readonly service: A08Service) {}

  /** GET /api/owner/footfall — Footfall by date range */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/footfall/hourly — Hourly footfall today */
  @Get('hourly')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHourly(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/owner/footfall/manual — Submit manual count */
  @Post('manual')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createManual(@Body() dto: CreateA08Dto) {
    return this.service.create(dto);
  }
}
