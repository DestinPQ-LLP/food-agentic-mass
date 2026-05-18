import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H04Service } from './h04.service';
import { CreateH04Dto } from './dto/create-h04.dto';
import { UpdateH04Dto } from './dto/update-h04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H04 — Google Review Request Bot
 *
 * Sends review request to customers with 4+ star internal rating.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h04/
 */
@ApiTags('H04 - Google Review Request Bot')
@ApiBearerAuth()
@Controller('api/quality/review-request')
export class H04Controller {
  constructor(private readonly service: H04Service) {}

  /** POST /api/quality/review-request/send — Send review request */
  @Post('send')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSend(@Body() dto: CreateH04Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/quality/review-request/settings — Set threshold and Google link */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateH04Dto) {
    // TODO (H04): implement PUT /api/quality/review-request/settings — Set threshold and Google link
        return { ok: true, endpoint: 'api/quality/review-request/settings', args: { dto } };
  }

  /** GET /api/quality/review-request/history — Send history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
