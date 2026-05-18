import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H10Service } from './h10.service';
import { CreateH10Dto } from './dto/create-h10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H10 — Internal Staff Feedback
 *
 * Kitchen and counter staff submit internal quality observations (e.g., batter consistency, oil temperature).
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h10/
 */
@ApiTags('H10 - Internal Staff Feedback')
@ApiBearerAuth()
@Controller('api/quality/staff-feedback')
export class H10Controller {
  constructor(private readonly service: H10Service) {}

  /** POST /api/quality/staff-feedback — Submit staff quality observation */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/staff-feedback — List staff feedback */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/staff-feedback/items — Staff feedback by item */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
