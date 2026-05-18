import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M10Service } from './m10.service';
import { CreateM10Dto } from './dto/create-m10.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M10 — Price Optimization Suggester
 *
 * Analyses price sensitivity and suggests optimal price points for menu items.
 *
 * Category: AI Support  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m10/
 */
@ApiTags('M10 - Price Optimization Suggester')
@ApiBearerAuth()
@Controller('api/ai/pricing')
export class M10Controller {
  constructor(private readonly service: M10Service) {}

  /** GET /api/ai/pricing/suggestions — Price optimization suggestions */
  @Get('suggestions')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSuggestions(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/pricing/sensitivity/:itemId — Demand sensitivity for item */
  @Get('sensitivity/:itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSensitivityByItemId(@Param('itemId') itemId: string) {
    // TODO (M10): implement GET /api/ai/pricing/sensitivity/:itemId — Demand sensitivity for item
        return { ok: true, endpoint: 'api/ai/pricing/sensitivity/:itemId', args: { itemId } };
  }

  /** POST /api/ai/pricing/simulate — Simulate revenue impact of price change */
  @Post('simulate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSimulate(@Body() dto: CreateM10Dto) {
    return this.service.create(dto);
  }
}
