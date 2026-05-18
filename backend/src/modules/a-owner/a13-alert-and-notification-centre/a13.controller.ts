import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A13Service } from './a13.service';
import { UpdateA13Dto } from './dto/update-a13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A13 — Alert & Notification Centre
 *
 * Single inbox for all system alerts: low stock, poor ratings, pending POs, payment mismatches.
 *
 * Category: Owner Centre  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a13/
 */
@ApiTags('A13 - Alert & Notification Centre')
@ApiBearerAuth()
@Controller('api/owner/alerts')
export class A13Controller {
  constructor(private readonly service: A13Service) {}

  /** GET /api/owner/alerts — All active alerts */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/owner/alerts/:id/dismiss — Dismiss an alert */
  @Put(':id/dismiss')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdDismiss(@Param('id') id: string, @Body() dto: UpdateA13Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/owner/alerts/critical — Critical unread alerts */
  @Get('critical')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCritical(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
