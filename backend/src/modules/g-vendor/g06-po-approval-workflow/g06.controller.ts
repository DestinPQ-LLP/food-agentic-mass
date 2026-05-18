import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G06Service } from './g06.service';
import { UpdateG06Dto } from './dto/update-g06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G06 — PO Approval Workflow
 *
 * Two-step approval for POs above a configurable value threshold.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g06/
 */
@ApiTags('G06 - PO Approval Workflow')
@ApiBearerAuth()
@Controller('api/vendors/purchase-orders')
export class G06Controller {
  constructor(private readonly service: G06Service) {}

  /** PUT /api/vendors/purchase-orders/:id/approve — Approve PO */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateG06Dto) {
    return this.service.update(id, dto);
  }

  /** PUT /api/vendors/purchase-orders/:id/reject — Reject PO with reason */
  @Put(':id/reject')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdReject(@Param('id') id: string, @Body() dto: UpdateG06Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/vendors/purchase-orders/pending-approval — POs awaiting approval */
  @Get('pending-approval')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPendingApproval(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
