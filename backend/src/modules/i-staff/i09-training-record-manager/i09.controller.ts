import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I09Service } from './i09.service';
import { CreateI09Dto } from './dto/create-i09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I09 — Training Record Manager
 *
 * Tracks which staff completed which training modules and when.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i09/
 */
@ApiTags('I09 - Training Record Manager')
@ApiBearerAuth()
@Controller('api/staff/training')
export class I09Controller {
  constructor(private readonly service: I09Service) {}

  /** POST /api/staff/training/record — Log training completion */
  @Post('record')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createRecord(@Body() dto: CreateI09Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/training/:staffId — Training records by staff */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (I09): implement GET /api/staff/training/:staffId — Training records by staff
        return { ok: true, endpoint: 'api/staff/training/:staffId', args: { staffId } };
  }

  /** GET /api/staff/training/pending — Staff with incomplete training */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
