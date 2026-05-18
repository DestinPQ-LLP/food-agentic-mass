import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H12Service } from './h12.service';
import { CreateH12Dto } from './dto/create-h12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H12 — Compliment Tracker
 *
 * Logs positive customer compliments to balance the complaint picture and recognise staff.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h12/
 */
@ApiTags('H12 - Compliment Tracker')
@ApiBearerAuth()
@Controller('api/quality/compliments')
export class H12Controller {
  constructor(private readonly service: H12Service) {}

  /** POST /api/quality/compliments — Log compliment */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH12Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/compliments — List compliments */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/compliments/staff — Compliments by staff */
  @Get('staff')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getStaff(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
