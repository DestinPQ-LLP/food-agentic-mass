import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B02Service } from './b02.service';
import { CreateB02Dto } from './dto/create-b02.dto';
import { UpdateB02Dto } from './dto/update-b02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B02 — Order Creation Screen
 *
 * Full order workflow: select items, set quantity, tag customer, choose dine-in/takeaway, and confirm.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b02/
 */
@ApiTags('B02 - Order Creation Screen')
@ApiBearerAuth()
@Controller('api/pos/orders')
export class B02Controller {
  constructor(private readonly service: B02Service) {}

  /** POST /api/pos/orders — Create a new order */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/orders/:id — Fetch order details */
  @Get(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** PUT /api/pos/orders/:id — Update order before payment */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateB02Dto) {
    return this.service.update(id, dto);
  }
}
