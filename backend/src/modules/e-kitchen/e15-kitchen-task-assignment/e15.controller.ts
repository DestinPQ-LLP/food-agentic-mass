import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { E15Service } from './e15.service';
import { CreateE15Dto } from './dto/create-e15.dto';
import { UpdateE15Dto } from './dto/update-e15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * E15 — Kitchen Task Assignment
 *
 * Manager assigns specific preparation tasks (e.g., soak rice, grind batter) to kitchen staff.
 *
 * Category: Kitchen  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/e15/
 */
@ApiTags('E15 - Kitchen Task Assignment')
@ApiBearerAuth()
@Controller('api/kitchen/tasks')
export class E15Controller {
  constructor(private readonly service: E15Service) {}

  /** POST /api/kitchen/tasks — Create kitchen task */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateE15Dto) {
    return this.service.create(dto);
  }

  /** GET /api/kitchen/tasks/today — Today's tasks */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/kitchen/tasks/:id/complete — Mark task complete */
  @Put(':id/complete')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdComplete(@Param('id') id: string, @Body() dto: UpdateE15Dto) {
    return this.service.update(id, dto);
  }
}
