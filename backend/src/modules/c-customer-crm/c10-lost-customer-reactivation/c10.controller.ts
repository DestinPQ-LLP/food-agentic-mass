import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C10Service } from './c10.service';
import { CreateC10Dto } from './dto/create-c10.dto';
import { UpdateC10Dto } from './dto/update-c10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C10 — Lost Customer Reactivation
 *
 * Identifies customers who haven't visited in N days and sends a re-engagement WhatsApp message.
 *
 * Category: Customer CRM  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c10/
 */
@ApiTags('C10 - Lost Customer Reactivation')
@ApiBearerAuth()
@Controller('api/crm/customers/lapsed')
export class C10Controller {
  constructor(private readonly service: C10Service) {}

  /** GET /api/crm/customers/lapsed — Lapsed customers list */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/crm/customers/lapsed/campaign — Send reactivation campaign */
  @Post('campaign')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCampaign(@Body() dto: CreateC10Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/crm/customers/lapsed/settings — Configure lapse threshold days */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateC10Dto) {
    // TODO (C10): implement PUT /api/crm/customers/lapsed/settings — Configure lapse threshold days
        return { ok: true, endpoint: 'api/crm/customers/lapsed/settings', args: { dto } };
  }
}
