import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M03Service } from './m03.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M03 — Wastage Prediction Model
 *
 * Predicts which items are likely to be wasted today based on prep history and demand forecast.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m03/
 */
@ApiTags('M03 - Wastage Prediction Model')
@ApiBearerAuth()
@Controller('api/ai/wastage/prediction')
export class M03Controller {
  constructor(private readonly service: M03Service) {}

  /** GET /api/ai/wastage/prediction — Wastage prediction for today */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/wastage/prediction/items — Per-item wastage risk */
  @Get('items')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getItems(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/wastage/prediction/history — Prediction accuracy history */
  @Get('history')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getHistory(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
