import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H15Service } from './h15.service';
import { CreateH15Dto } from './dto/create-h15.dto';
import { UpdateH15Dto } from './dto/update-h15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H15 — AI Review Reply Drafter
 *
 * Uses AI to draft a professional response to customer reviews for manager review and send.
 *
 * Category: Quality  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h15/
 */
@ApiTags('H15 - AI Review Reply Drafter')
@ApiBearerAuth()
@Controller('api/quality/ai-reply')
export class H15Controller {
  constructor(private readonly service: H15Service) {}

  /** POST /api/quality/ai-reply/draft — Draft AI review reply */
  @Post('draft')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createDraft(@Body() dto: CreateH15Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/quality/ai-reply/approve — Approve and send draft */
  @Put('approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateApprove(@Body() dto: UpdateH15Dto) {
    // TODO (H15): implement PUT /api/quality/ai-reply/approve — Approve and send draft
        return { ok: true, endpoint: 'api/quality/ai-reply/approve', args: { dto } };
  }

  /** GET /api/quality/ai-reply/drafts — Pending AI drafts */
  @Get('drafts')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDrafts(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
