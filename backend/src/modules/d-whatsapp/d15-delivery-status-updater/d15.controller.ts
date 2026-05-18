import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D15Service } from './d15.service';
import { CreateD15Dto } from './dto/create-d15.dto';
import { UpdateD15Dto } from './dto/update-d15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D15 — Delivery Status Updater
 *
 * Sends real-time WhatsApp updates to customers at each delivery stage: dispatched, out-for-delivery, delivered.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d15/
 */
@ApiTags('D15 - Delivery Status Updater')
@ApiBearerAuth()
@Controller('api/whatsapp/delivery-update')
export class D15Controller {
  constructor(private readonly service: D15Service) {}

  /** POST /api/whatsapp/delivery-update/send — Send delivery status update */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/delivery-update/templates — Status update templates */
  @Get('templates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/delivery-update/templates/:stage — Update stage template */
  @Put('templates/:stage')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateTemplatesByStage(@Param('stage') stage: string, @Body() dto: UpdateD15Dto) {
    // TODO (D15): implement PUT /api/whatsapp/delivery-update/templates/:stage — Update stage template
        return { ok: true, endpoint: 'api/whatsapp/delivery-update/templates/:stage', args: { stage, dto } };
  }
}
