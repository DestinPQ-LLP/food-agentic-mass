import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H02Service } from './h02.service';
import { CreateH02Dto } from './dto/create-h02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H02 — Customer Feedback Form
 *
 * Extended feedback form with item-level ratings, comments, and optional contact.
 *
 * Category: Quality  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h02/
 */
@ApiTags('H02 - Customer Feedback Form')
@ApiBearerAuth()
@Controller('api/quality/feedback')
export class H02Controller {
  constructor(private readonly service: H02Service) {}

  /** POST /api/quality/feedback — Submit feedback */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/feedback — List all feedback */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/feedback/items — Feedback linked to items */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
