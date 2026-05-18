import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { M06Service } from './m06.service';
import { UpdateM06Dto } from './dto/update-m06.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

/**
 * M06 — Sales Anomaly Detector
 *
 * Flags unusually high or low sales days, hours, or items for investigation.
 *
 * Category: AI Support  ·  Phase 3
 * Frontend: https://food-agentic-mass.azureedge.net/offerings/m06/
 */
@ApiTags('M06 - Sales Anomaly Detector')
@ApiBearerAuth()
@Controller('api/ai/anomalies')
export class M06Controller {
  constructor(private readonly service: M06Service) {}

  /** GET /api/ai/anomalies — Sales anomalies for period */
  @Get()
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  list(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** GET /api/ai/anomalies/today — Today's anomalies */
  @Get('today')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  getToday(@Query('branchId') branchId?: string) {
    return this.service.list(branchId);
  }

  /** PUT /api/ai/anomalies/settings — Configure sensitivity */
  @Put('settings')
  @Roles(Role.OWNER, Role.MANAGER, Role.ADMIN)
  updateSettings(@Body() dto: UpdateM06Dto) {
    // TODO (M06): implement PUT /api/ai/anomalies/settings — Configure sensitivity
        return { ok: true, endpoint: 'api/ai/anomalies/settings', args: { dto } };
  }
}
