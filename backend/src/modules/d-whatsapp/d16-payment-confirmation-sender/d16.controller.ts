import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D16Service } from './d16.service';
import { CreateD16Dto } from './dto/create-d16.dto';
import { UpdateD16Dto } from './dto/update-d16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D16 — Payment Confirmation Sender
 *
 * Sends a payment receipt via WhatsApp to the customer after successful payment.
 *
 * Category: WhatsApp Marketing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d16/
 */
@ApiTags('D16 - Payment Confirmation Sender')
@ApiBearerAuth()
@Controller('api/whatsapp/payment-confirm')
export class D16Controller {
  constructor(private readonly service: D16Service) {}

  /** POST /api/whatsapp/payment-confirm/send — Send payment confirmation */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/payment-confirm/template — Get template */
  @Get('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/payment-confirm/template — Update template */
  @Put('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateTemplate(@Body() dto: UpdateD16Dto) {
    // TODO (D16): implement PUT /api/whatsapp/payment-confirm/template — Update template
        return { ok: true, endpoint: 'api/whatsapp/payment-confirm/template', args: { dto } };
  }
}
