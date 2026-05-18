import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K17Service } from './k17.service';
import { CreateK17Dto } from './dto/create-k17.dto';
import { UpdateK17Dto } from './dto/update-k17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K17 — Return & Exchange Manager
 *
 * Handles order returns at delivery, triggering refund or replacement workflows.
 *
 * Category: Delivery  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k17/
 */
@ApiTags('K17 - Return & Exchange Manager')
@ApiBearerAuth()
@Controller('api/delivery/returns')
export class K17Controller {
  constructor(private readonly service: K17Service) {}

  /** POST /api/delivery/returns — Create return request */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateK17Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/delivery/returns/:id/approve — Approve return */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateK17Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/delivery/returns — List all returns */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
