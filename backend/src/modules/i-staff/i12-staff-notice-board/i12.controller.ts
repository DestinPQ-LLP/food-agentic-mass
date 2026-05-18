import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I12Service } from './i12.service';
import { CreateI12Dto } from './dto/create-i12.dto';
import { UpdateI12Dto } from './dto/update-i12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I12 — Staff Notice Board
 *
 * Digital notice board for posting announcements, policy updates, and general notices.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i12/
 */
@ApiTags('I12 - Staff Notice Board')
@ApiBearerAuth()
@Controller('api/staff/notices')
export class I12Controller {
  constructor(private readonly service: I12Service) {}

  /** POST /api/staff/notices — Post a notice */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI12Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/notices/active — Active notices */
  @Get('active')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getActive(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/staff/notices/:id/archive — Archive notice */
  @Put(':id/archive')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdArchive(@Param('id') id: string, @Body() dto: UpdateI12Dto) {
    return this.service.update(id, dto);
  }
}
