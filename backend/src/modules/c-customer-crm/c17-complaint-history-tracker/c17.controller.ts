import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C17Service } from './c17.service';
import { CreateC17Dto } from './dto/create-c17.dto';
import { UpdateC17Dto } from './dto/update-c17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C17 — Complaint History Tracker
 *
 * Links customer complaints to their profile so staff can see repeat issue patterns at a glance.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c17/
 */
@ApiTags('C17 - Complaint History Tracker')
@ApiBearerAuth()
@Controller('api/crm')
export class C17Controller {
  constructor(private readonly service: C17Service) {}

  /** GET /api/crm/customers/:id/complaints — Complaints by customer */
  @Get('customers/:id/complaints')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCustomersByIdComplaints(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** POST /api/crm/complaints — Log a complaint */
  @Post('complaints')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createComplaints(@Body() dto: CreateC17Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/crm/complaints/:id/resolve — Resolve complaint */
  @Put('complaints/:id/resolve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateComplaintsByIdResolve(@Param('id') id: string, @Body() dto: UpdateC17Dto) {
    return this.service.update(id, dto);
  }
}
