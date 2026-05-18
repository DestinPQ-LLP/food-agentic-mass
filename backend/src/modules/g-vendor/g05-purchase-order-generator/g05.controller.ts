import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G05Service } from './g05.service';
import { CreateG05Dto } from './dto/create-g05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G05 — Purchase Order Generator
 *
 * Creates a formal PO from an approved purchase request, linked to a vendor.
 *
 * Category: Vendor  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g05/
 */
@ApiTags('G05 - Purchase Order Generator')
@ApiBearerAuth()
@Controller('api/vendors/purchase-orders')
export class G05Controller {
  constructor(private readonly service: G05Service) {}

  /** POST /api/vendors/purchase-orders — Create PO */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/purchase-orders — List POs */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/purchase-orders/:id — PO details */
  @Get(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
