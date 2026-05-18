import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N02Service } from './n02.service';
import { CreateN02Dto } from './dto/create-n02.dto';
import { UpdateN02Dto } from './dto/update-n02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N02 — Outlet Configuration Manager
 *
 * Create and configure new outlets with address, operating hours, and local server settings.
 *
 * Category: Multi-Branch  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n02/
 */
@ApiTags('N02 - Outlet Configuration Manager')
@ApiBearerAuth()
@Controller('api/branches')
export class N02Controller {
  constructor(private readonly service: N02Service) {}

  /** POST /api/branches — Create new branch/outlet */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateN02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches — List all branches */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/branches/:id — Update branch configuration */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateN02Dto) {
    return this.service.update(id, dto);
  }
}
