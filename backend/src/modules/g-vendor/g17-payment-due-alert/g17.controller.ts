import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { G17Service } from './g17.service';
import { CreateG17Dto } from './dto/create-g17.dto';
import { UpdateG17Dto } from './dto/update-g17.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * G17 — Payment Due Alert
 *
 * Sends WhatsApp reminders to procurement staff when vendor payment is due.
 *
 * Category: Vendor  ·  Phase 2
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/g17/
 */
@ApiTags('G17 - Payment Due Alert')
@ApiBearerAuth()
@Controller('api/vendors/payments')
export class G17Controller {
  constructor(private readonly service: G17Service) {}

  /** GET /api/vendors/payments/due-soon — Payments due within N days */
  @Get('due-soon')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getDueSoon(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** POST /api/vendors/payments/due-soon/remind — Send payment reminder */
  @Post('due-soon/remind')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  createDueSoonRemind(@Body() dto: CreateG17Dto) {
    return this.service.create(dto);
  }

  /** PUT /api/vendors/payments/due-alert/settings — Configure alert days ahead */
  @Put('due-alert/settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateDueAlertSettings(@Body() dto: UpdateG17Dto) {
    // TODO (G17): implement PUT /api/vendors/payments/due-alert/settings — Configure alert days ahead
        return { ok: true, endpoint: 'api/vendors/payments/due-alert/settings', args: { dto } };
  }
}
