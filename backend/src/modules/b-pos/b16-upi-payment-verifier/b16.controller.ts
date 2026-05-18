import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { B16Service } from './b16.service';
import { CreateB16Dto } from './dto/create-b16.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * B16 — UPI Payment Verifier
 *
 * Lets cashiers enter UPI transaction reference numbers and flags any unmatched or duplicate references.
 *
 * Category: POS & Billing  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/b16/
 */
@ApiTags('B16 - UPI Payment Verifier')
@ApiBearerAuth()
@Controller('api/pos/upi')
export class B16Controller {
  constructor(private readonly service: B16Service) {}

  /** POST /api/pos/upi/verify — Verify a UPI transaction reference */
  @Post('verify')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createVerify(@Body() dto: CreateB16Dto) {
    return this.service.create(dto);
  }

  /** GET /api/pos/upi/unmatched — List unmatched UPI payments */
  @Get('unmatched')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getUnmatched(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/pos/upi/duplicates — List duplicate UPI references */
  @Get('duplicates')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDuplicates(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
