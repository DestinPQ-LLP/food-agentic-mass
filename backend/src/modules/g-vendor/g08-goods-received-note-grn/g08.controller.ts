import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G08Service } from './g08.service';
import { CreateG08Dto } from './dto/create-g08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G08 — Goods Received Note (GRN)
 *
 * Records actual quantities received against a PO, handling partial deliveries.
 *
 * Category: Vendor  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g08/
 */
@ApiTags('G08 - Goods Received Note (GRN)')
@ApiBearerAuth()
@Controller('api/vendors/grn')
export class G08Controller {
  constructor(private readonly service: G08Service) {}

  /** POST /api/vendors/grn — Create GRN against PO */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/grn — List GRNs */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/grn/:id — GRN details */
  @Get(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
