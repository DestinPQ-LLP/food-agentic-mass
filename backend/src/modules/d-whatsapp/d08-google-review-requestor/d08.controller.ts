import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D08Service } from './d08.service';
import { CreateD08Dto } from './dto/create-d08.dto';
import { UpdateD08Dto } from './dto/update-d08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D08 — Google Review Requestor
 *
 * Sends a WhatsApp message with the Google Maps review link to customers who gave 4+ star ratings.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d08/
 */
@ApiTags('D08 - Google Review Requestor')
@ApiBearerAuth()
@Controller('api/whatsapp/review-request')
export class D08Controller {
  constructor(private readonly service: D08Service) {}

  /** POST /api/whatsapp/review-request/send — Send review request */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD08Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/review-request/settings — Set rating threshold and link */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateD08Dto) {
    // TODO (D08): implement PUT /api/whatsapp/review-request/settings — Set rating threshold and link
        return { ok: true, endpoint: 'api/whatsapp/review-request/settings', args: { dto } };
  }

  /** GET /api/whatsapp/review-request/history — Send history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
