import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H06Service } from './h06.service';
import { CreateH06Dto } from './dto/create-h06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H06 — Item Quality Complaint Log
 *
 * Staff or customers log quality issues against specific menu items.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h06/
 */
@ApiTags('H06 - Item Quality Complaint Log')
@ApiBearerAuth()
@Controller('api/quality/complaints')
export class H06Controller {
  constructor(private readonly service: H06Service) {}

  /** POST /api/quality/complaints — Log a quality complaint */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH06Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/complaints — List complaints */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/complaints/items — Complaints by item */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
