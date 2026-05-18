import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I18Service } from './i18.service';
import { CreateI18Dto } from './dto/create-i18.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * I18 — HR Documents Store
 *
 * Stores employee contracts, ID copies, and HR documents with role-based access.
 *
 * Category: Staff  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/i18/
 */
@ApiTags('I18 - HR Documents Store')
@ApiBearerAuth()
@Controller('api/staff/documents')
export class I18Controller {
  constructor(private readonly service: I18Service) {}

  /** POST /api/staff/documents — Upload HR document */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateI18Dto) {
    return this.service.create(dto);
  }

  /** GET /api/staff/documents/:staffId — Documents by staff */
  @Get(':staffId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByStaffId(@Param('staffId') staffId: string) {
    // TODO (I18): implement GET /api/staff/documents/:staffId — Documents by staff
        return { ok: true, endpoint: 'api/staff/documents/:staffId', args: { staffId } };
  }

  /** DELETE /api/staff/documents/:id — Delete document */
  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  removeById(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
