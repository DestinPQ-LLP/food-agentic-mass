import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C06Service } from './c06.service';
import { UpdateC06Dto } from './dto/update-c06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C06 — Customer Segmentation
 *
 * Auto-classifies customers as New, Regular, VIP, or Lapsed based on visit frequency and spend.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c06/
 */
@ApiTags('C06 - Customer Segmentation')
@ApiBearerAuth()
@Controller('api/crm/segments')
export class C06Controller {
  constructor(private readonly service: C06Service) {}

  /** GET /api/crm/segments — Get customer segment counts */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/segments/:segment/customers — Customers in a segment */
  @Get(':segment/customers')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBySegmentCustomers(@Param('segment') segment: string) {
    // TODO (C06): implement GET /api/crm/segments/:segment/customers — Customers in a segment
        return { ok: true, endpoint: 'api/crm/segments/:segment/customers', args: { segment } };
  }

  /** PUT /api/crm/segments/rules — Update segmentation rules */
  @Put('rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateRules(@Body() dto: UpdateC06Dto) {
    // TODO (C06): implement PUT /api/crm/segments/rules — Update segmentation rules
        return { ok: true, endpoint: 'api/crm/segments/rules', args: { dto } };
  }
}
