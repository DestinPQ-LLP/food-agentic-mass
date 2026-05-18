import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G04Service } from './g04.service';
import { CreateG04Dto } from './dto/create-g04.dto';
import { UpdateG04Dto } from './dto/update-g04.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G04 — Purchase Request Creator
 *
 * Staff raises a procurement request that goes to manager for approval before a PO is generated.
 *
 * Category: Vendor  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g04/
 */
@ApiTags('G04 - Purchase Request Creator')
@ApiBearerAuth()
@Controller('api/vendors/requests')
export class G04Controller {
  constructor(private readonly service: G04Service) {}

  /** POST /api/vendors/requests — Create purchase request */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG04Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/requests — List all requests */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/vendors/requests/:id/approve — Approve request */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateG04Dto) {
    return this.service.update(id, dto);
  }
}
