import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E02Service } from './e02.service';
import { CreateE02Dto } from './dto/create-e02.dto';
import { UpdateE02Dto } from './dto/update-e02.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E02 — Order Token Queue
 *
 * Sequential token number display for kitchen to prepare in order, with sound alert on new token.
 *
 * Category: Kitchen  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e02/
 */
@ApiTags('E02 - Order Token Queue')
@ApiBearerAuth()
@Controller('api/kitchen/tokens')
export class E02Controller {
  constructor(private readonly service: E02Service) {}

  /** GET /api/kitchen/tokens/queue — Current token queue */
  @Get('queue')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getQueue(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/tokens/:id/call — Call a token */
  @Put(':id/call')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdCall(@Param('id') id: string, @Body() dto: UpdateE02Dto) {
    return this.service.update(id, dto);
  }

  /** POST /api/kitchen/tokens/reset — Reset token counter */
  @Post('reset')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createReset(@Body() dto: CreateE02Dto) {
    return this.service.create(dto);
  }
}
