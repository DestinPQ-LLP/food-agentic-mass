import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E12Service } from './e12.service';
import { UpdateE12Dto } from './dto/update-e12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E12 — Recipe/BOM Viewer
 *
 * Shows kitchen staff the ingredients, quantities, and steps for each menu item.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e12/
 */
@ApiTags('E12 - Recipe/BOM Viewer')
@ApiBearerAuth()
@Controller('api/kitchen/recipes')
export class E12Controller {
  constructor(private readonly service: E12Service) {}

  /** GET /api/kitchen/recipes/:itemId — Recipe for a specific item */
  @Get(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByItemId(@Param('itemId') itemId: string) {
    // TODO (E12): implement GET /api/kitchen/recipes/:itemId — Recipe for a specific item
        return { ok: true, endpoint: 'api/kitchen/recipes/:itemId', args: { itemId } };
  }

  /** GET /api/kitchen/recipes — All recipes */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/recipes/:itemId — Update recipe */
  @Put(':itemId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByItemId(@Param('itemId') itemId: string, @Body() dto: UpdateE12Dto) {
    // TODO (E12): implement PUT /api/kitchen/recipes/:itemId — Update recipe
        return { ok: true, endpoint: 'api/kitchen/recipes/:itemId', args: { itemId, dto } };
  }
}
