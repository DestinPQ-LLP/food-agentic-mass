import { Controller, Delete, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C15Service } from './c15.service';
import { CreateC15Dto } from './dto/create-c15.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C15 — Selfie/Face Abstraction Module
 *
 * Optional consent-based module that captures face embedding for returning-customer recognition.
 *
 * Category: Customer CRM  ·  Phase 4
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c15/
 */
@ApiTags('C15 - Selfie/Face Abstraction Module')
@ApiBearerAuth()
@Controller('api/crm/face')
export class C15Controller {
  constructor(private readonly service: C15Service) {}

  /** POST /api/crm/face/enrol — Enrol customer face (consent required) */
  @Post('enrol')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createEnrol(@Body() dto: CreateC15Dto) {
    return this.service.create(dto);
  }

  /** POST /api/crm/face/identify — Identify customer from camera frame */
  @Post('identify')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createIdentify(@Body() dto: CreateC15Dto) {
    return this.service.create(dto);
  }

  /** DELETE /api/crm/face/:customerId — Delete face data on request */
  @Delete(':customerId')
  @Roles(Role.OWNER, Role.ADMIN)
  removeByCustomerId(@Param('customerId') customerId: string) {
    // TODO (C15): implement DELETE /api/crm/face/:customerId — Delete face data on request
        return { ok: true, endpoint: 'api/crm/face/:customerId', args: { customerId } };
  }
}
