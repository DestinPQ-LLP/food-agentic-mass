import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G03Service } from './g03.service';
import { CreateG03Dto } from './dto/create-g03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G03 — Rate History Tracker
 *
 * Records the price per unit for each material from each vendor over time.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g03/
 */
@ApiTags('G03 - Rate History Tracker')
@ApiBearerAuth()
@Controller('api/vendors/rates')
export class G03Controller {
  constructor(private readonly service: G03Service) {}

  /** POST /api/vendors/rates — Log a vendor rate */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG03Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/rates/:vendorId/:materialId — Rate history */
  @Get(':vendorId/:materialId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByVendorIdByMaterialId(@Param('vendorId') vendorId: string, @Param('materialId') materialId: string) {
    // TODO (G03): implement GET /api/vendors/rates/:vendorId/:materialId — Rate history
        return { ok: true, endpoint: 'api/vendors/rates/:vendorId/:materialId', args: { vendorId, materialId } };
  }

  /** GET /api/vendors/rates/compare — Compare rates across vendors */
  @Get('compare')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCompare(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
