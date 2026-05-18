import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I05Service } from './i05.service';
import { UpdateI05Dto } from './dto/update-i05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I05 — Task Completion Tracker
 *
 * Staff marks tasks as complete; manager sees completion rate in real time.
 *
 * Category: Staff  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i05/
 */
@ApiTags('I05 - Task Completion Tracker')
@ApiBearerAuth()
@Controller('api/staff/tasks')
export class I05Controller {
  constructor(private readonly service: I05Service) {}

  /** PUT /api/staff/tasks/:id/complete — Mark task complete */
  @Put(':id/complete')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdComplete(@Param('id') id: string, @Body() dto: UpdateI05Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/staff/tasks/pending — Pending tasks */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/staff/tasks/completion-rate — Completion rate by staff */
  @Get('completion-rate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompletionRate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
