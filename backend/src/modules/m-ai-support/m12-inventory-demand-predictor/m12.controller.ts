import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M12Service } from './m12.service';
import { CreateM12Dto } from './dto/create-m12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M12 — Inventory Demand Predictor
 *
 * Predicts how much of each raw material to procure based on AI demand forecasting.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m12/
 */
@ApiTags('M12 - Inventory Demand Predictor')
@ApiBearerAuth()
@Controller('api/ai/inventory/forecast')
export class M12Controller {
  constructor(private readonly service: M12Service) {}

  /** GET /api/ai/inventory/forecast — Inventory demand forecast */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/inventory/forecast/items — Per-material forecast */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/ai/inventory/forecast/generate-po — Generate PO from forecast */
  @Post('generate-po')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createGeneratePo(@Body() dto: CreateM12Dto) {
    return this.service.create(dto);
  }
}
