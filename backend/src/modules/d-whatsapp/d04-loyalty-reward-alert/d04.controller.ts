import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D04Service } from './d04.service';
import { CreateD04Dto } from './dto/create-d04.dto';
import { UpdateD04Dto } from './dto/update-d04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D04 — Loyalty Reward Alert
 *
 * Notifies customers when they earn points or when they are close to a reward milestone.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d04/
 */
@ApiTags('D04 - Loyalty Reward Alert')
@ApiBearerAuth()
@Controller('api/whatsapp/loyalty-alert')
export class D04Controller {
  constructor(private readonly service: D04Service) {}

  /** POST /api/whatsapp/loyalty-alert/send — Send loyalty alert */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/loyalty-alert/template — Get template */
  @Get('template')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplate(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/whatsapp/loyalty-alert/rules — Set alert trigger rules */
  @Put('rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateRules(@Body() dto: UpdateD04Dto) {
    // TODO (D04): implement PUT /api/whatsapp/loyalty-alert/rules — Set alert trigger rules
        return { ok: true, endpoint: 'api/whatsapp/loyalty-alert/rules', args: { dto } };
  }
}
