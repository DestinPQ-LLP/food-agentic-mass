import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G16Service } from './g16.service';
import { CreateG16Dto } from './dto/create-g16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G16 — Credit/Debit Note Manager
 *
 * Handles vendor returns, short supplies, and rate adjustments through credit/debit notes.
 *
 * Category: Vendor  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g16/
 */
@ApiTags('G16 - Credit/Debit Note Manager')
@ApiBearerAuth()
@Controller('api/vendors')
export class G16Controller {
  constructor(private readonly service: G16Service) {}

  /** POST /api/vendors/credit-notes — Create credit note */
  @Post('credit-notes')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCreditNotes(@Body() dto: CreateG16Dto) {
    return this.service.create(dto);
  }

  /** POST /api/vendors/debit-notes — Create debit note */
  @Post('debit-notes')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createDebitNotes(@Body() dto: CreateG16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/credit-notes/:vendorId — Credit notes by vendor */
  @Get('credit-notes/:vendorId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCreditNotesByVendorId(@Param('vendorId') vendorId: string) {
    // TODO (G16): implement GET /api/vendors/credit-notes/:vendorId — Credit notes by vendor
        return { ok: true, endpoint: 'api/vendors/credit-notes/:vendorId', args: { vendorId } };
  }
}
