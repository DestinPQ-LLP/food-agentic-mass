import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { A17Service } from './a17.service';
import { UpdateA17Dto } from './dto/update-a17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * A17 — Exception Report
 *
 * Flags anomalies: unusually high cancellations, stock discrepancies, payment mismatches, and outlier days.
 *
 * Category: Owner Centre  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/a17/
 */
@ApiTags('A17 - Exception Report')
@ApiBearerAuth()
@Controller('api/owner/exceptions')
export class A17Controller {
  constructor(private readonly service: A17Service) {}

  /** GET /api/owner/exceptions — All exceptions for date range */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/owner/exceptions/unresolved — Open unresolved exceptions */
  @Get('unresolved')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnresolved(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/owner/exceptions/:id/resolve — Mark as resolved */
  @Put(':id/resolve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdResolve(@Param('id') id: string, @Body() dto: UpdateA17Dto) {
    return this.service.update(id, dto);
  }
}
