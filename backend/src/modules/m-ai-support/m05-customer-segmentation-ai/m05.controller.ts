import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M05Service } from './m05.service';
import { CreateM05Dto } from './dto/create-m05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M05 — Customer Segmentation AI
 *
 * Automatically classifies customers into behaviour clusters using ML on order history.
 *
 * Category: AI Support  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m05/
 */
@ApiTags('M05 - Customer Segmentation AI')
@ApiBearerAuth()
@Controller('api/ai/segmentation')
export class M05Controller {
  constructor(private readonly service: M05Service) {}

  /** POST /api/ai/segmentation/run — Run customer segmentation */
  @Post('run')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createRun(@Body() dto: CreateM05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/segmentation/clusters — Customer clusters */
  @Get('clusters')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getClusters(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/segmentation/customer/:id — Cluster assignment for customer */
  @Get('customer/:id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCustomerById(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
