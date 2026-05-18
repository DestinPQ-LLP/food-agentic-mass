import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C07Service } from './c07.service';
import { CreateC07Dto } from './dto/create-c07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C07 — Feedback Collection Form
 *
 * Post-order feedback form (star rating + comments) accessible via QR code, link, or counter tablet.
 *
 * Category: Customer CRM  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c07/
 */
@ApiTags('C07 - Feedback Collection Form')
@ApiBearerAuth()
@Controller('api/crm/feedback')
export class C07Controller {
  constructor(private readonly service: C07Service) {}

  /** POST /api/crm/feedback — Submit customer feedback */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateC07Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/feedback/recent — Recent feedback list */
  @Get('recent')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRecent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/feedback/:orderId — Feedback for a specific order */
  @Get(':orderId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByOrderId(@Param('orderId') orderId: string) {
    // TODO (C07): implement GET /api/crm/feedback/:orderId — Feedback for a specific order
        return { ok: true, endpoint: 'api/crm/feedback/:orderId', args: { orderId } };
  }
}
