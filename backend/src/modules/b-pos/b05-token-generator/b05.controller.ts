import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B05Service } from './b05.service';
import { CreateB05Dto } from './dto/create-b05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B05 — Token Generator
 *
 * Prints or displays a sequential token number when an order is placed at the counter.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b05/
 */
@ApiTags('B05 - Token Generator')
@ApiBearerAuth()
@Controller('api/pos/tokens')
export class B05Controller {
  constructor(private readonly service: B05Service) {}

  /** POST /api/pos/tokens — Generate token for order */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateB05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/tokens/next — Peek next token number */
  @Get('next')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getNext(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/tokens/today — All tokens for today */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
