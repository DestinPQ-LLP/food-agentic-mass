import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H14Service } from './h14.service';
import { CreateH14Dto } from './dto/create-h14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H14 — Customer Response Manager
 *
 * Allows manager to draft and send responses to customer feedback through the platform.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h14/
 */
@ApiTags('H14 - Customer Response Manager')
@ApiBearerAuth()
@Controller('api/quality/feedback')
export class H14Controller {
  constructor(private readonly service: H14Service) {}

  /** POST /api/quality/feedback/:id/respond — Respond to feedback */
  @Post(':id/respond')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createByIdRespond(@Param('id') id: string, @Body() dto: CreateH14Dto) {
    // TODO (H14): implement POST /api/quality/feedback/:id/respond — Respond to feedback
        return { ok: true, endpoint: 'api/quality/feedback/:id/respond', args: { id, dto } };
  }

  /** GET /api/quality/feedback/unresponded — Feedback without response */
  @Get('unresponded')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnresponded(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/feedback/:id/conversation — Full conversation thread */
  @Get(':id/conversation')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdConversation(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
