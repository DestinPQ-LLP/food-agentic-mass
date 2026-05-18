import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B15Service } from './b15.service';
import { CreateB15Dto } from './dto/create-b15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B15 — Shift Opening/Closing Report
 *
 * Summary of orders, revenue, and cash for a cashier's shift, auto-generated at shift boundaries.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b15/
 */
@ApiTags('B15 - Shift Opening/Closing Report')
@ApiBearerAuth()
@Controller('api/pos/shifts')
export class B15Controller {
  constructor(private readonly service: B15Service) {}

  /** POST /api/pos/shifts/open — Open a shift */
  @Post('open')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createOpen(@Body() dto: CreateB15Dto) {
    return this.service.create(dto);
  }

  /** POST /api/pos/shifts/close — Close a shift with summary */
  @Post('close')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createClose(@Body() dto: CreateB15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/shifts/:id/report — Get shift report */
  @Get(':id/report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdReport(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
