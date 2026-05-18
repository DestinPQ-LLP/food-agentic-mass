import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C14Service } from './c14.service';
import { CreateC14Dto } from './dto/create-c14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C14 — Consent Management
 *
 * Records customer consent for data collection, marketing, and optional biometric features.
 *
 * Category: Customer CRM  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c14/
 */
@ApiTags('C14 - Consent Management')
@ApiBearerAuth()
@Controller('api/crm/consent')
export class C14Controller {
  constructor(private readonly service: C14Service) {}

  /** POST /api/crm/consent — Record consent for a customer */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateC14Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/consent/:customerId — Get consent status */
  @Get(':customerId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByCustomerId(@Param('customerId') customerId: string) {
    // TODO (C14): implement GET /api/crm/consent/:customerId — Get consent status
        return { ok: true, endpoint: 'api/crm/consent/:customerId', args: { customerId } };
  }

  /** DELETE /api/crm/consent/:customerId — Withdraw customer consent */
  @Delete(':customerId')
  @Roles(Role.OWNER, Role.ADMIN)
  removeByCustomerId(@Param('customerId') customerId: string) {
    // TODO (C14): implement DELETE /api/crm/consent/:customerId — Withdraw customer consent
        return { ok: true, endpoint: 'api/crm/consent/:customerId', args: { customerId } };
  }
}
