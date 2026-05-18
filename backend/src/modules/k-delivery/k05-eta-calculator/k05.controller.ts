import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K05Service } from './k05.service';
import { CreateK05Dto } from './dto/create-k05.dto';
import { UpdateK05Dto } from './dto/update-k05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K05 — ETA Calculator
 *
 * Estimates delivery time based on distance, kitchen prep time, and agent availability.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k05/
 */
@ApiTags('K05 - ETA Calculator')
@ApiBearerAuth()
@Controller('api/delivery/eta')
export class K05Controller {
  constructor(private readonly service: K05Service) {}

  /** POST /api/delivery/eta/calculate — Calculate ETA for order */
  @Post('calculate')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createCalculate(@Body() dto: CreateK05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/eta/settings — ETA configuration */
  @Get('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getSettings(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/delivery/eta/settings — Update ETA parameters */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateK05Dto) {
    // TODO (K05): implement PUT /api/delivery/eta/settings — Update ETA parameters
        return { ok: true, endpoint: 'api/delivery/eta/settings', args: { dto } };
  }
}
