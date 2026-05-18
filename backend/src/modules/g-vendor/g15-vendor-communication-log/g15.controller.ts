import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G15Service } from './g15.service';
import { CreateG15Dto } from './dto/create-g15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G15 — Vendor Communication Log
 *
 * Maintains a log of all WhatsApp messages, calls, and notes exchanged with each vendor.
 *
 * Category: Vendor  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g15/
 */
@ApiTags('G15 - Vendor Communication Log')
@ApiBearerAuth()
@Controller('api/vendors/communications')
export class G15Controller {
  constructor(private readonly service: G15Service) {}

  /** POST /api/vendors/communications — Log a communication */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/communications/:vendorId — Communications by vendor */
  @Get(':vendorId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByVendorId(@Param('vendorId') vendorId: string) {
    // TODO (G15): implement GET /api/vendors/communications/:vendorId — Communications by vendor
        return { ok: true, endpoint: 'api/vendors/communications/:vendorId', args: { vendorId } };
  }

  /** GET /api/vendors/communications/recent — Recent communications */
  @Get('recent')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRecent(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
