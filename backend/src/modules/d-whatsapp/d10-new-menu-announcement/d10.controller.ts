import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D10Service } from './d10.service';
import { CreateD10Dto } from './dto/create-d10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D10 — New Menu Announcement
 *
 * Broadcasts a new item or menu change to a selected customer segment via WhatsApp.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d10/
 */
@ApiTags('D10 - New Menu Announcement')
@ApiBearerAuth()
@Controller('api/whatsapp/menu-announcement')
export class D10Controller {
  constructor(private readonly service: D10Service) {}

  /** POST /api/whatsapp/menu-announcement/send — Send announcement */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD10Dto) {
    return this.service.create(dto);
  }

  /** GET /api/whatsapp/menu-announcement/templates — Announcement templates */
  @Get('templates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getTemplates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/whatsapp/menu-announcement/history — Announcement history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
