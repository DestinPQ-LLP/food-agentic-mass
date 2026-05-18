import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C13Service } from './c13.service';
import { CreateC13Dto } from './dto/create-c13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C13 — Customer Data Export
 *
 * Exports the full customer list with profiles, segments, and LTV data to CSV or Excel.
 *
 * Category: Customer CRM  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c13/
 */
@ApiTags('C13 - Customer Data Export')
@ApiBearerAuth()
@Controller('api/crm/customers/export')
export class C13Controller {
  constructor(private readonly service: C13Service) {}

  /** GET /api/crm/customers/export/csv — Export customers as CSV */
  @Get('csv')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getCsv(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/crm/customers/export/excel — Export customers as Excel */
  @Get('excel')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getExcel(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/crm/customers/export/filtered — Export with applied filters */
  @Post('filtered')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createFiltered(@Body() dto: CreateC13Dto) {
    return this.service.create(dto);
  }
}
