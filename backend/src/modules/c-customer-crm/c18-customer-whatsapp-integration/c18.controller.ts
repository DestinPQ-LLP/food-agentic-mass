import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C18Service } from './c18.service';
import { CreateC18Dto } from './dto/create-c18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C18 — Customer WhatsApp Integration
 *
 * Send individual or bulk WhatsApp messages to customers from within the CRM.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c18/
 */
@ApiTags('C18 - Customer WhatsApp Integration')
@ApiBearerAuth()
@Controller('api/crm/whatsapp')
export class C18Controller {
  constructor(private readonly service: C18Service) {}

  /** POST /api/crm/whatsapp/send — Send WhatsApp message to customer */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateC18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/whatsapp/templates — List message templates */
  @Get('templates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/whatsapp/history/:customerId — Message history for customer */
  @Get('history/:customerId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistoryByCustomerId(@Param('customerId') customerId: string) {
    // TODO (C18): implement GET /api/crm/whatsapp/history/:customerId — Message history for customer
        return { ok: true, endpoint: 'api/crm/whatsapp/history/:customerId', args: { customerId } };
  }
}
