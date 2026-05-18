import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D18Service } from './d18.service';
import { CreateD18Dto } from './dto/create-d18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D18 — Bulk Broadcast Manager
 *
 * Segment-targeted mass messaging with scheduling, rate-limiting, and delivery reporting.
 *
 * Category: WhatsApp Marketing  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d18/
 */
@ApiTags('D18 - Bulk Broadcast Manager')
@ApiBearerAuth()
@Controller('api/whatsapp/broadcast')
export class D18Controller {
  constructor(private readonly service: D18Service) {}

  /** POST /api/whatsapp/broadcast — Create and schedule bulk broadcast */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateD18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/broadcast/:id/report — Broadcast delivery report */
  @Get(':id/report')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdReport(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** DELETE /api/whatsapp/broadcast/:id — Cancel scheduled broadcast */
  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  removeById(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
