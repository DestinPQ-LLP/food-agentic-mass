import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M08Service } from './m08.service';
import { CreateM08Dto } from './dto/create-m08.dto';
import { UpdateM08Dto } from './dto/update-m08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M08 — AI-Generated Owner Summary
 *
 * Produces a daily plain-English narrative summary of business performance for the owner.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m08/
 */
@ApiTags('M08 - AI-Generated Owner Summary')
@ApiBearerAuth()
@Controller('api/ai/summary')
export class M08Controller {
  constructor(private readonly service: M08Service) {}

  /** GET /api/ai/summary/today — AI narrative summary for today */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/ai/summary/send — Send summary to owner */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateM08Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/ai/summary/settings — Configure summary parameters */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateM08Dto) {
    // TODO (M08): implement PUT /api/ai/summary/settings — Configure summary parameters
        return { ok: true, endpoint: 'api/ai/summary/settings', args: { dto } };
  }
}
