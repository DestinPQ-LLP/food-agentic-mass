import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { K12Service } from './k12.service';
import { CreateK12Dto } from './dto/create-k12.dto';
import { UpdateK12Dto } from './dto/update-k12.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * K12 — Customer Address Manager
 *
 * Saves and manages customer delivery addresses linked to their mobile number.
 *
 * Category: Delivery  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/k12/
 */
@ApiTags('K12 - Customer Address Manager')
@ApiBearerAuth()
@Controller('api/delivery/addresses')
export class K12Controller {
  constructor(private readonly service: K12Service) {}

  /** POST /api/delivery/addresses — Save address for customer */
  @Post()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  create(@Body() dto: CreateK12Dto) {
    return this.service.create(dto);
  }

  /** GET /api/delivery/addresses/:customerId — Customer addresses */
  @Get(':customerId')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getByCustomerId(@Param('customerId') customerId: string) {
    // TODO (K12): implement GET /api/delivery/addresses/:customerId — Customer addresses
        return { ok: true, endpoint: 'api/delivery/addresses/:customerId', args: { customerId } };
  }

  /** PUT /api/delivery/addresses/:id/default — Set default address */
  @Put(':id/default')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdDefault(@Param('id') id: string, @Body() dto: UpdateK12Dto) {
    return this.service.update(id, dto);
  }
}
