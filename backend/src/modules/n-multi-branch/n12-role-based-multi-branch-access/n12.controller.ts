import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N12Service } from './n12.service';
import { UpdateN12Dto } from './dto/update-n12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N12 — Role-based Multi-Branch Access
 *
 * Controls which staff can see and act on data for which branches.
 *
 * Category: Multi-Branch  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n12/
 */
@ApiTags('N12 - Role-based Multi-Branch Access')
@ApiBearerAuth()
@Controller('api/branches/access')
export class N12Controller {
  constructor(private readonly service: N12Service) {}

  /** PUT /api/branches/access/:userId — Set user branch access */
  @Put(':userId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByUserId(@Param('userId') userId: string, @Body() dto: UpdateN12Dto) {
    // TODO (N12): implement PUT /api/branches/access/:userId — Set user branch access
        return { ok: true, endpoint: 'api/branches/access/:userId', args: { userId, dto } };
  }

  /** GET /api/branches/access/:userId — Get user branch permissions */
  @Get(':userId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByUserId(@Param('userId') userId: string) {
    // TODO (N12): implement GET /api/branches/access/:userId — Get user branch permissions
        return { ok: true, endpoint: 'api/branches/access/:userId', args: { userId } };
  }

  /** GET /api/branches/access/audit — Access change audit log */
  @Get('audit')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getAudit(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
