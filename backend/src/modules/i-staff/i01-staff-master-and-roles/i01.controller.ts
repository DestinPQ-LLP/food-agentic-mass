import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I01Service } from './i01.service';
import { CreateI01Dto } from './dto/create-i01.dto';
import { UpdateI01Dto } from './dto/update-i01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I01 — Staff Master & Roles
 *
 * Manages staff profiles, roles (cashier, kitchen, inventory, manager), and login credentials.
 *
 * Category: Staff  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i01/
 */
@ApiTags('I01 - Staff Master & Roles')
@ApiBearerAuth()
@Controller('api/staff')
export class I01Controller {
  constructor(private readonly service: I01Service) {}

  /** POST /api/staff — Create staff member */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff — List staff */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/staff/:id/role — Update staff role */
  @Put(':id/role')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdRole(@Param('id') id: string, @Body() dto: UpdateI01Dto) {
    return this.service.update(id, dto);
  }
}
