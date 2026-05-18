import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { J08Service } from './j08.service';
import { CreateJ08Dto } from './dto/create-j08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * J08 — Payment Collection Tracker
 *
 * Tracks receivables (credit sales or advance orders) and their collection status.
 *
 * Category: Accounts  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/j08/
 */
@ApiTags('J08 - Payment Collection Tracker')
@ApiBearerAuth()
@Controller('api/accounts/receivables')
export class J08Controller {
  constructor(private readonly service: J08Service) {}

  /** GET /api/accounts/receivables — All outstanding receivables */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/accounts/receivables/collect — Record collection */
  @Post('collect')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCollect(@Body() dto: CreateJ08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/accounts/receivables/overdue — Overdue receivables */
  @Get('overdue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOverdue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
