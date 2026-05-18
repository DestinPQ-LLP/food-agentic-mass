import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { C08Service } from './c08.service';
import { CreateC08Dto } from './dto/create-c08.dto';
import { UpdateC08Dto } from './dto/update-c08.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * C08 — Customer Birthday Alerts
 *
 * Stores customer birthday (optional) and triggers a WhatsApp wish or offer on the birthday.
 *
 * Category: Customer CRM  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/c08/
 */
@ApiTags('C08 - Customer Birthday Alerts')
@ApiBearerAuth()
@Controller('api/crm/customers')
export class C08Controller {
  constructor(private readonly service: C08Service) {}

  /** PUT /api/crm/customers/:id/birthday — Save birthday */
  @Put(':id/birthday')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateByIdBirthday(@Param('id') id: string, @Body() dto: UpdateC08Dto) {
    return this.service.update(id, dto);
  }

  /** GET /api/crm/customers/birthdays/today — Customers with birthday today */
  @Get('birthdays/today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getBirthdaysToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/crm/customers/birthdays/send-wishes — Trigger birthday WhatsApp */
  @Post('birthdays/send-wishes')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createBirthdaysSendWishes(@Body() dto: CreateC08Dto) {
    return this.service.create(dto);
  }
}
