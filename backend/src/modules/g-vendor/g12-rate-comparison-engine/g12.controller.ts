import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G12Service } from './g12.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G12 — Rate Comparison Engine
 *
 * Compares current vendor rates for the same material across vendors.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g12/
 */
@ApiTags('G12 - Rate Comparison Engine')
@ApiBearerAuth()
@Controller('api/vendors/rates')
export class G12Controller {
  constructor(private readonly service: G12Service) {}

  /** GET /api/vendors/rates/compare/:materialId — Compare rates for a material */
  @Get('compare/:materialId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompareByMaterialId(@Param('materialId') materialId: string) {
    // TODO (G12): implement GET /api/vendors/rates/compare/:materialId — Compare rates for a material
        return { ok: true, endpoint: 'api/vendors/rates/compare/:materialId', args: { materialId } };
  }

  /** GET /api/vendors/rates/savings — Potential savings from switching */
  @Get('savings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSavings(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/vendors/rates/lowest — Lowest-rate vendor per material */
  @Get('lowest')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getLowest(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
