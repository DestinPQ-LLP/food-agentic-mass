import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { F11Service } from './f11.service';
import { CreateF11Dto } from './dto/create-f11.dto';
import { UpdateF11Dto } from './dto/update-f11.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * F11 — Recipe-to-Inventory Mapper
 *
 * Links each menu item to the raw materials it consumes per serving, enabling auto-deduction.
 *
 * Category: Inventory  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/f11/
 */
@ApiTags('F11 - Recipe-to-Inventory Mapper')
@ApiBearerAuth()
@Controller('api/inventory/recipes')
export class F11Controller {
  constructor(private readonly service: F11Service) {}

  /** POST /api/inventory/recipes — Create item-to-material mapping */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateF11Dto) {
    return this.service.create(dto);
  }

  /** GET /api/inventory/recipes/:itemId — Get recipe for item */
  @Get(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByItemId(@Param('itemId') itemId: string) {
    // TODO (F11): implement GET /api/inventory/recipes/:itemId — Get recipe for item
        return { ok: true, endpoint: 'api/inventory/recipes/:itemId', args: { itemId } };
  }

  /** PUT /api/inventory/recipes/:itemId — Update recipe mapping */
  @Put(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByItemId(@Param('itemId') itemId: string, @Body() dto: UpdateF11Dto) {
    // TODO (F11): implement PUT /api/inventory/recipes/:itemId — Update recipe mapping
        return { ok: true, endpoint: 'api/inventory/recipes/:itemId', args: { itemId, dto } };
  }
}
