import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I07Service } from './i07.service';
import { CreateI07Dto } from './dto/create-i07.dto';
import { UpdateI07Dto } from './dto/update-i07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I07 — Leave Management
 *
 * Staff requests leave; manager approves or rejects; leave balance is tracked.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i07/
 */
@ApiTags('I07 - Leave Management')
@ApiBearerAuth()
@Controller('api/staff/leave')
export class I07Controller {
  constructor(private readonly service: I07Service) {}

  /** POST /api/staff/leave/request — Request leave */
  @Post('request')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createRequest(@Body() dto: CreateI07Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/staff/leave/:id/approve — Approve leave */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateI07Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/staff/leave/balance/:staffId — Leave balance */
  @Get('balance/:staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBalanceByStaffId(@Param('staffId') staffId: string) {
    // TODO (I07): implement GET /api/staff/leave/balance/:staffId — Leave balance
        return { ok: true, endpoint: 'api/staff/leave/balance/:staffId', args: { staffId } };
  }
}
