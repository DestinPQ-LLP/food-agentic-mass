import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { H13Service } from './h13.service';
import { CreateH13Dto } from './dto/create-h13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * H13 — Quality SOP Document Store
 *
 * Upload and categorise Standard Operating Procedures accessible to all staff.
 *
 * Category: Quality  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/h13/
 */
@ApiTags('H13 - Quality SOP Document Store')
@ApiBearerAuth()
@Controller('api/quality/sops')
export class H13Controller {
  constructor(private readonly service: H13Service) {}

  /** POST /api/quality/sops — Upload SOP document */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateH13Dto) {
    return this.service.create(dto);
  }

  /** GET /api/quality/sops — List SOPs */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/quality/sops/:id/download — Download SOP */
  @Get(':id/download')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByIdDownload(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
