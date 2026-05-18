import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H09Service } from './h09.service';
import { UpdateH09Dto } from './dto/update-h09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H09 — Batch Quality Linker
 *
 * Links production batches to quality issues so a bad batch can be traced immediately.
 *
 * Category: Quality  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h09/
 */
@ApiTags('H09 - Batch Quality Linker')
@ApiBearerAuth()
@Controller('api')
export class H09Controller {
  constructor(private readonly service: H09Service) {}

  /** PUT /api/quality/complaints/:id/batch — Link complaint to batch */
  @Put('quality/complaints/:id/batch')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateQualityComplaintsByIdBatch(@Param('id') id: string, @Body() dto: UpdateH09Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/kitchen/batches/:id/complaints — Complaints for a batch */
  @Get('kitchen/batches/:id/complaints')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getKitchenBatchesByIdComplaints(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** GET /api/quality/complaints/batches/high — Batches with most complaints */
  @Get('quality/complaints/batches/high')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getQualityComplaintsBatchesHigh(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
