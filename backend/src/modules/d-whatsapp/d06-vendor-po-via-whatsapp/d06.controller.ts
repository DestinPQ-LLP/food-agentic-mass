import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D06Service } from './d06.service';
import { CreateD06Dto } from './dto/create-d06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D06 — Vendor PO via WhatsApp
 *
 * Sends a formatted purchase order to the vendor's WhatsApp number directly from the system.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d06/
 */
@ApiTags('D06 - Vendor PO via WhatsApp')
@ApiBearerAuth()
@Controller('api/whatsapp/vendor-po')
export class D06Controller {
  constructor(private readonly service: D06Service) {}

  /** POST /api/whatsapp/vendor-po/send — Send PO to vendor */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD06Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/vendor-po/template — Get PO WhatsApp template */
  @Get('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/whatsapp/vendor-po/history — Send history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
