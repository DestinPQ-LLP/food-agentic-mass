import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G07Service } from './g07.service';
import { CreateG07Dto } from './dto/create-g07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G07 — WhatsApp PO Dispatcher
 *
 * Sends the PO as a formatted WhatsApp message or PDF link to the vendor.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g07/
 */
@ApiTags('G07 - WhatsApp PO Dispatcher')
@ApiBearerAuth()
@Controller('api/vendors/purchase-orders')
export class G07Controller {
  constructor(private readonly service: G07Service) {}

  /** POST /api/vendors/purchase-orders/:id/send-whatsapp — Send PO via WhatsApp */
  @Post(':id/send-whatsapp')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdSendWhatsapp(@Param('id') id: string, @Body() dto: CreateG07Dto) {
    // TODO (G07): implement POST /api/vendors/purchase-orders/:id/send-whatsapp — Send PO via WhatsApp
        return { ok: true, endpoint: 'api/vendors/purchase-orders/:id/send-whatsapp', args: { id, dto } };
  }

  /** GET /api/vendors/purchase-orders/:id/send-status — WhatsApp send status */
  @Get(':id/send-status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdSendStatus(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/vendors/purchase-orders/sent — List sent POs */
  @Get('sent')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
