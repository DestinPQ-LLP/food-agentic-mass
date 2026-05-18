import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J01Service } from './j01.service';
import { CreateJ01Dto } from './dto/create-j01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J01 — Daily Cash Register
 *
 * Records all cash transactions for the day: inflows and outflows with running balance.
 *
 * Category: Accounts  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j01/
 */
@ApiTags('J01 - Daily Cash Register')
@ApiBearerAuth()
@Controller('api/accounts/cash')
export class J01Controller {
  constructor(private readonly service: J01Service) {}

  /** POST /api/accounts/cash/entry — Add cash entry */
  @Post('entry')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEntry(@Body() dto: CreateJ01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/cash/today — Today's cash register */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/cash/balance — Current cash balance */
  @Get('balance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBalance(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
