import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B09Service } from './b09.service';
import { CreateB09Dto } from './dto/create-b09.dto';
import { UpdateB09Dto } from './dto/update-b09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B09 — Tax & GST Calculator
 *
 * Automatically computes GST and other applicable taxes per item based on configured tax slabs.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b09/
 */
@ApiTags('B09 - Tax & GST Calculator')
@ApiBearerAuth()
@Controller('api/pos/tax')
export class B09Controller {
  constructor(private readonly service: B09Service) {}

  /** GET /api/pos/tax/slabs — List tax slabs */
  @Get('slabs')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSlabs(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/pos/tax/calculate — Calculate tax for an order */
  @Post('calculate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCalculate(@Body() dto: CreateB09Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/pos/tax/slabs/:id — Update tax slab */
  @Put('slabs/:id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSlabsById(@Param('id') id: string, @Body() dto: UpdateB09Dto) {
    return this.service.update(id, dto);
  }
}
