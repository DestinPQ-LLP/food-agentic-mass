import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K11Service } from './k11.service';
import { CreateK11Dto } from './dto/create-k11.dto';
import { UpdateK11Dto } from './dto/update-k11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K11 — Delivery Charge Calculator
 *
 * Auto-calculates delivery fee based on zone, order amount, or distance.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k11/
 */
@ApiTags('K11 - Delivery Charge Calculator')
@ApiBearerAuth()
@Controller('api/delivery/charges')
export class K11Controller {
  constructor(private readonly service: K11Service) {}

  /** POST /api/delivery/charges/calculate — Calculate delivery charge */
  @Post('calculate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCalculate(@Body() dto: CreateK11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/charges/rules — Charge rules */
  @Get('rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getRules(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/charges/rules — Update charge rules */
  @Put('rules')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateRules(@Body() dto: UpdateK11Dto) {
    // TODO (K11): implement PUT /api/delivery/charges/rules — Update charge rules
        return { ok: true, endpoint: 'api/delivery/charges/rules', args: { dto } };
  }
}
