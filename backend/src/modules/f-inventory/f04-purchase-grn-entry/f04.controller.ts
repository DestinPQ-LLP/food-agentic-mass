import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F04Service } from './f04.service';
import { CreateF04Dto } from './dto/create-f04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F04 — Purchase/GRN Entry
 *
 * Records goods received from vendors: item, quantity, rate, and vendor reference.
 *
 * Category: Inventory  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f04/
 */
@ApiTags('F04 - Purchase/GRN Entry')
@ApiBearerAuth()
@Controller('api/inventory/purchases')
export class F04Controller {
  constructor(private readonly service: F04Service) {}

  /** POST /api/inventory/purchases — Log a purchase/GRN */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/purchases — List purchases */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/inventory/purchases/:id — Purchase detail */
  @Get(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
