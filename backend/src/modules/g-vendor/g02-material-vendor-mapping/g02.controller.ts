import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G02Service } from './g02.service';
import { CreateG02Dto } from './dto/create-g02.dto';
import { UpdateG02Dto } from './dto/update-g02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G02 — Material-Vendor Mapping
 *
 * Links each raw material to one or more vendors with preferred status.
 *
 * Category: Vendor  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g02/
 */
@ApiTags('G02 - Material-Vendor Mapping')
@ApiBearerAuth()
@Controller('api/vendors/mappings')
export class G02Controller {
  constructor(private readonly service: G02Service) {}

  /** POST /api/vendors/mappings — Create material-vendor mapping */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateG02Dto) {
    return this.service.create(dto);
  }

  /** GET /api/vendors/mappings/:materialId — Vendors for a material */
  @Get(':materialId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByMaterialId(@Param('materialId') materialId: string) {
    // TODO (G02): implement GET /api/vendors/mappings/:materialId — Vendors for a material
        return { ok: true, endpoint: 'api/vendors/mappings/:materialId', args: { materialId } };
  }

  /** PUT /api/vendors/mappings/:id/preferred — Set preferred vendor */
  @Put(':id/preferred')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdPreferred(@Param('id') id: string, @Body() dto: UpdateG02Dto) {
    return this.service.update(id, dto);
  }
}
