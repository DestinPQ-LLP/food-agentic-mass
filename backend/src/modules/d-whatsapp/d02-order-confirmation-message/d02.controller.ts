import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D02Service } from './d02.service';
import { CreateD02Dto } from './dto/create-d02.dto';
import { UpdateD02Dto } from './dto/update-d02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D02 — Order Confirmation Message
 *
 * Sends a WhatsApp confirmation to the customer after order is placed, showing items and total.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d02/
 */
@ApiTags('D02 - Order Confirmation Message')
@ApiBearerAuth()
@Controller('api/whatsapp/order-confirmation')
export class D02Controller {
  constructor(private readonly service: D02Service) {}

  /** POST /api/whatsapp/order-confirmation/send — Send order confirmation */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/order-confirmation/template — Get template */
  @Get('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/order-confirmation/template — Update template */
  @Put('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateTemplate(@Body() dto: UpdateD02Dto) {
    // TODO (D02): implement PUT /api/whatsapp/order-confirmation/template — Update template
        return { ok: true, endpoint: 'api/whatsapp/order-confirmation/template', args: { dto } };
  }
}
