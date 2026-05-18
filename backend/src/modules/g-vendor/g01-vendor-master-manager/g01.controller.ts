import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G01Service } from './g01.service';
import { CreateG01Dto } from './dto/create-g01.dto';
import { UpdateG01Dto } from './dto/update-g01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G01 — Vendor Master Manager
 *
 * Manage the list of vendors with contact, supplied items, payment terms, and lead time.
 *
 * Category: Vendor  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g01/
 */
@ApiTags('G01 - Vendor Master Manager')
@ApiBearerAuth()
@Controller('api/vendors')
export class G01Controller {
  constructor(private readonly service: G01Service) {}

  /** POST /api/vendors — Create vendor */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors — List vendors */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/vendors/:id — Update vendor */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateG01Dto) {
    return this.service.update(id, dto);
  }
}
