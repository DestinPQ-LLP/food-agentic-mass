import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M16Service } from './m16.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M16 — Vendor Rate Analyser
 *
 * AI compares vendor rates against market benchmarks and historical trends to flag overpricing.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m16/
 */
@ApiTags('M16 - Vendor Rate Analyser')
@ApiBearerAuth()
@Controller('api/ai/vendor-rates')
export class M16Controller {
  constructor(private readonly service: M16Service) {}

  /** GET /api/ai/vendor-rates/analysis — Rate analysis across vendors */
  @Get('analysis')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAnalysis(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/vendor-rates/overprice — Overpriced items by vendor */
  @Get('overprice')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getOverprice(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/vendor-rates/benchmark — Market benchmark rates */
  @Get('benchmark')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBenchmark(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
