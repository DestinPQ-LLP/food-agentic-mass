import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J15Service } from './j15.service';
import { CreateJ15Dto } from './dto/create-j15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J15 — Petty Cash Tracker
 *
 * Records small cash expenses from the petty cash fund with category and receipt.
 *
 * Category: Accounts  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j15/
 */
@ApiTags('J15 - Petty Cash Tracker')
@ApiBearerAuth()
@Controller('api/accounts/petty-cash')
export class J15Controller {
  constructor(private readonly service: J15Service) {}

  /** POST /api/accounts/petty-cash/entry — Log petty cash entry */
  @Post('entry')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEntry(@Body() dto: CreateJ15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/petty-cash/balance — Current petty cash balance */
  @Get('balance')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBalance(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/accounts/petty-cash/log — Petty cash log */
  @Get('log')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLog(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
