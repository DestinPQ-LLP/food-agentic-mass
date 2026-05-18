import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M14Service } from './m14.service';
import { CreateM14Dto } from './dto/create-m14.dto';
import { UpdateM14Dto } from './dto/update-m14.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M14 — AI Review Response Drafter
 *
 * Generates professional responses to customer reviews for manager approval before sending.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m14/
 */
@ApiTags('M14 - AI Review Response Drafter')
@ApiBearerAuth()
@Controller('api/ai/review-reply')
export class M14Controller {
  constructor(private readonly service: M14Service) {}

  /** POST /api/ai/review-reply/draft — Draft review reply */
  @Post('draft')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createDraft(@Body() dto: CreateM14Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/review-reply/pending — Pending drafts for approval */
  @Get('pending')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPending(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/ai/review-reply/:id/approve — Approve and send draft */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateM14Dto) {
    return this.service.update(id, dto);
  }
}
