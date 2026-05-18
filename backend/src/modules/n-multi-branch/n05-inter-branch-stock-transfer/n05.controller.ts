import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { N05Service } from './n05.service';
import { CreateN05Dto } from './dto/create-n05.dto';
import { UpdateN05Dto } from './dto/update-n05.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * N05 — Inter-Branch Stock Transfer
 *
 * Initiates stock transfer between branches to balance inventory levels.
 *
 * Category: Multi-Branch  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/n05/
 */
@ApiTags('N05 - Inter-Branch Stock Transfer')
@ApiBearerAuth()
@Controller('api/branches/transfers')
export class N05Controller {
  constructor(private readonly service: N05Service) {}

  /** POST /api/branches/transfers — Create inter-branch transfer */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateN05Dto) {
    return this.service.create(dto);
  }

  /** GET /api/branches/transfers — List transfers */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/branches/transfers/:id/approve — Approve transfer */
  @Put(':id/approve')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdApprove(@Param('id') id: string, @Body() dto: UpdateN05Dto) {
    return this.service.update(id, dto);
  }
}
