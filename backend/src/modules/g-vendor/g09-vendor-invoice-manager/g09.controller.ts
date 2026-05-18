import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G09Service } from './g09.service';
import { CreateG09Dto } from './dto/create-g09.dto';
import { UpdateG09Dto } from './dto/update-g09.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G09 — Vendor Invoice Manager
 *
 * Stores and tracks vendor invoices linked to GRNs for payment processing.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g09/
 */
@ApiTags('G09 - Vendor Invoice Manager')
@ApiBearerAuth()
@Controller('api/vendors/invoices')
export class G09Controller {
  constructor(private readonly service: G09Service) {}

  /** POST /api/vendors/invoices — Upload vendor invoice */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG09Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/invoices — List invoices */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/vendors/invoices/:id/status — Update invoice payment status */
  @Put(':id/status')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdStatus(@Param('id') id: string, @Body() dto: UpdateG09Dto) {
    return this.service.update(id, dto);
  }
}
