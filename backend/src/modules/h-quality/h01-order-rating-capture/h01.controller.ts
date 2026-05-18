import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H01Service } from './h01.service';
import { CreateH01Dto } from './dto/create-h01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H01 — Order Rating Capture
 *
 * Customer submits a star rating (1–5) linked to their order, accessible via QR or tablet.
 *
 * Category: Quality  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h01/
 */
@ApiTags('H01 - Order Rating Capture')
@ApiBearerAuth()
@Controller('api/quality/ratings')
export class H01Controller {
  constructor(private readonly service: H01Service) {}

  /** POST /api/quality/ratings — Submit order rating */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/ratings — List ratings */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/ratings/average — Average rating for period */
  @Get('average')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAverage(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
