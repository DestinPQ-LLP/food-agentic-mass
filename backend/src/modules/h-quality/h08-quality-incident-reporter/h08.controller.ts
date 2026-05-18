import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H08Service } from './h08.service';
import { CreateH08Dto } from './dto/create-h08.dto';
import { UpdateH08Dto } from './dto/update-h08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H08 — Quality Incident Reporter
 *
 * Formal incident reporting for serious quality issues: foreign objects, contamination, illness.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h08/
 */
@ApiTags('H08 - Quality Incident Reporter')
@ApiBearerAuth()
@Controller('api/quality/incidents')
export class H08Controller {
  constructor(private readonly service: H08Service) {}

  /** POST /api/quality/incidents — Create incident report */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH08Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/incidents — List incidents */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/quality/incidents/:id/close — Close incident with resolution */
  @Put(':id/close')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdClose(@Param('id') id: string, @Body() dto: UpdateH08Dto) {
    return this.service.update(id, dto);
  }
}
