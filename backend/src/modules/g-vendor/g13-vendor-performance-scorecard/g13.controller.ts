import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G13Service } from './g13.service';
import { CreateG13Dto } from './dto/create-g13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G13 — Vendor Performance Scorecard
 *
 * Rates vendors on delivery reliability, quality complaints, and rate consistency.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g13/
 */
@ApiTags('G13 - Vendor Performance Scorecard')
@ApiBearerAuth()
@Controller('api/vendors/performance')
export class G13Controller {
  constructor(private readonly service: G13Service) {}

  /** GET /api/vendors/performance/:vendorId — Vendor performance score */
  @Get(':vendorId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByVendorId(@Param('vendorId') vendorId: string) {
    // TODO (G13): implement GET /api/vendors/performance/:vendorId — Vendor performance score
        return { ok: true, endpoint: 'api/vendors/performance/:vendorId', args: { vendorId } };
  }

  /** GET /api/vendors/performance/ranking — All vendors ranked */
  @Get('ranking')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRanking(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/vendors/performance/review — Submit vendor review */
  @Post('review')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createReview(@Body() dto: CreateG13Dto) {
    return this.service.create(dto);
  }
}
