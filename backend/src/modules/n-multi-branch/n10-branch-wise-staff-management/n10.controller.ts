import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N10Service } from './n10.service';
import { CreateN10Dto } from './dto/create-n10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N10 — Branch-wise Staff Management
 *
 * Manage staff rosters, attendance, and performance per outlet from a central view.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n10/
 */
@ApiTags('N10 - Branch-wise Staff Management')
@ApiBearerAuth()
@Controller('api/branches/staff')
export class N10Controller {
  constructor(private readonly service: N10Service) {}

  /** GET /api/branches/staff/all — Staff across all branches */
  @Get('all')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAll(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/branches/staff/:branchId — Staff for a branch */
  @Get(':branchId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByBranchId(@Param('branchId') branchId: string) {
    // TODO (N10): implement GET /api/branches/staff/:branchId — Staff for a branch
        return { ok: true, endpoint: 'api/branches/staff/:branchId', args: { branchId } };
  }

  /** POST /api/branches/staff/transfer — Transfer staff between branches */
  @Post('transfer')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createTransfer(@Body() dto: CreateN10Dto) {
    return this.service.create(dto);
  }
}
