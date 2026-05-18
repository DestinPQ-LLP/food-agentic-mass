import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M04Service } from './m04.service';
import { CreateM04Dto } from './dto/create-m04.dto';
import { UpdateM04Dto } from './dto/update-m04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M04 — Product Recommendation AI
 *
 * Suggests upsell or add-on items to cashier during order creation based on order context.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m04/
 */
@ApiTags('M04 - Product Recommendation AI')
@ApiBearerAuth()
@Controller('api/ai/recommendations')
export class M04Controller {
  constructor(private readonly service: M04Service) {}

  /** POST /api/ai/recommendations/upsell — Get upsell suggestions for order */
  @Post('upsell')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createUpsell(@Body() dto: CreateM04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/recommendations/popular — Popular item pairings */
  @Get('popular')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getPopular(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/ai/recommendations/settings — Configure recommendation rules */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateM04Dto) {
    // TODO (M04): implement PUT /api/ai/recommendations/settings — Configure recommendation rules
        return { ok: true, endpoint: 'api/ai/recommendations/settings', args: { dto } };
  }
}
