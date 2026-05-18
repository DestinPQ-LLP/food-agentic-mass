import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N03Service } from './n03.service';
import { CreateN03Dto } from './dto/create-n03.dto';
import { UpdateN03Dto } from './dto/update-n03.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N03 — Centralized Menu Manager
 *
 * Manage the menu across all branches from one admin panel; push updates to all or select branches.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n03/
 */
@ApiTags('N03 - Centralized Menu Manager')
@ApiBearerAuth()
@Controller('api/branches/menu')
export class N03Controller {
  constructor(private readonly service: N03Service) {}

  /** PUT /api/branches/menu/publish — Publish menu update to branches */
  @Put('publish')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updatePublish(@Body() dto: UpdateN03Dto) {
    // TODO (N03): implement PUT /api/branches/menu/publish — Publish menu update to branches
        return { ok: true, endpoint: 'api/branches/menu/publish', args: { dto } };
  }

  /** GET /api/branches/menu/diff — Show menu differences across branches */
  @Get('diff')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDiff(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/branches/menu/sync — Sync menu to selected branches */
  @Post('sync')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createSync(@Body() dto: CreateN03Dto) {
    return this.service.create(dto);
  }
}
