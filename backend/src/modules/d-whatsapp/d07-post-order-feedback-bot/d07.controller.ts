import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { D07Service } from './d07.service';
import { CreateD07Dto } from './dto/create-d07.dto';
import { UpdateD07Dto } from './dto/update-d07.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * D07 — Post-Order Feedback Bot
 *
 * Sends a WhatsApp feedback request to the customer a configurable time after order completion.
 *
 * Category: WhatsApp Marketing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/d07/
 */
@ApiTags('D07 - Post-Order Feedback Bot')
@ApiBearerAuth()
@Controller('api/whatsapp/feedback-request')
export class D07Controller {
  constructor(private readonly service: D07Service) {}

  /** POST /api/whatsapp/feedback-request/send — Send feedback request */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateD07Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/whatsapp/feedback-request/delay — Set delay after order */
  @Put('delay')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateDelay(@Body() dto: UpdateD07Dto) {
    // TODO (D07): implement PUT /api/whatsapp/feedback-request/delay — Set delay after order
        return { ok: true, endpoint: 'api/whatsapp/feedback-request/delay', args: { dto } };
  }

  /** GET /api/whatsapp/feedback-request/responses — List responses received */
  @Get('responses')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getResponses(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
