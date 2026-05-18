import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B06Service } from './b06.service';
import { CreateB06Dto } from './dto/create-b06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B06 — Bill/Receipt Printer
 *
 * Generates a formatted bill with itemised list, taxes, total, and payment mode for printing.
 *
 * Category: POS & Billing  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b06/
 */
@ApiTags('B06 - Bill/Receipt Printer')
@ApiBearerAuth()
@Controller('api/pos/bills/:orderId')
export class B06Controller {
  constructor(private readonly service: B06Service) {}

  /** GET /api/pos/bills/:orderId — Generate bill HTML/PDF */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/pos/bills/:orderId/print — Trigger printer */
  @Post('print')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createPrint(@Body() dto: CreateB06Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/bills/:orderId/resend — Resend bill to customer WhatsApp */
  @Get('resend')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getResend(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
