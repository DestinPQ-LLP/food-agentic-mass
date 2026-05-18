import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M13Service } from './m13.service';
import { CreateM13Dto } from './dto/create-m13.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M13 — Document Q&A Assistant
 *
 * Allows staff to ask questions about uploaded SOPs, BRDs, and policies in natural language.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m13/
 */
@ApiTags('M13 - Document Q&A Assistant')
@ApiBearerAuth()
@Controller('api/ai/docs')
export class M13Controller {
  constructor(private readonly service: M13Service) {}

  /** POST /api/ai/docs/query — Query uploaded documents */
  @Post('query')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createQuery(@Body() dto: CreateM13Dto) {
    return this.service.create(dto);
  }

  /** POST /api/ai/docs/upload — Upload document to knowledge base */
  @Post('upload')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createUpload(@Body() dto: CreateM13Dto) {
    return this.service.create(dto);
  }

  /** GET /api/ai/docs/list — List indexed documents */
  @Get('list')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getList(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }
}
