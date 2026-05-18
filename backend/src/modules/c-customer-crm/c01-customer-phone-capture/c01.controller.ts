import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C01Service } from './c01.service';
import { CreateC01Dto } from './dto/create-c01.dto';
import { UpdateC01Dto } from './dto/update-c01.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C01 — Customer Phone Capture
 *
 * Captures customer mobile number at billing with optional name, used as the primary CRM identifier.
 *
 * Category: Customer CRM  ·  Phase 1
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c01/
 */
@ApiTags('C01 - Customer Phone Capture')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C01Controller {
  constructor(private readonly service: C01Service) {}

  /** POST /api/crm/customers — Create or find customer by phone */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateC01Dto) {
    return this.service.create(dto);
  }

  /** GET /api/crm/customers/:phone — Look up customer by mobile */
  @Get(':phone')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByPhone(@Param('phone') phone: string) {
    // TODO (C01): implement GET /api/crm/customers/:phone — Look up customer by mobile
        return { ok: true, endpoint: 'api/crm/customers/:phone', args: { phone } };
  }

  /** PUT /api/crm/customers/:id — Update customer profile */
  @Put(':id')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateById(@Param('id') id: string, @Body() dto: UpdateC01Dto) {
    return this.service.update(id, dto);
  }
}
