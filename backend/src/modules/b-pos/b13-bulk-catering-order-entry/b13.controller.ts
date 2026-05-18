import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B13Service } from './b13.service';
import { CreateB13Dto } from './dto/create-b13.dto';
import { UpdateB13Dto } from './dto/update-b13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B13 — Bulk/Catering Order Entry
 *
 * Special order screen for large or catering orders with advance booking, delivery date, and custom items.
 *
 * Category: POS & Billing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b13/
 */
@ApiTags('B13 - Bulk/Catering Order Entry')
@ApiBearerAuth()
@Controller('api/pos/orders/bulk')
export class B13Controller {
  constructor(private readonly service: B13Service) {}

  /** POST /api/pos/orders/bulk — Create a bulk order */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB13Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/orders/bulk — List upcoming bulk orders */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/pos/orders/bulk/:id/status — Update bulk order status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateB13Dto) {
    return this.service.update(id, dto);
  }
}
