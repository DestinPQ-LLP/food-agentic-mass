import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H16Entity } from './h16.entity';
import { CreateH16Dto } from './dto/create-h16.dto';
import { UpdateH16Dto } from './dto/update-h16.dto';

/**
 * H16 — Quality Alert Notifications
 *
 * Real-time alerts for quality events: escalated rating, new serious complaint, or checklist incomplete.
 *
 * Endpoints implemented by H16Controller:
 *   GET    /api/quality/alerts  — All quality alerts
 *   PUT    /api/quality/alerts/:id/dismiss  — Dismiss alert
 *   PUT    /api/quality/alerts/settings  — Configure alert rules
 */
@Injectable()
export class H16Service {
  constructor(
    @InjectRepository(H16Entity)
    private readonly repo: Repository<H16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H16 record ${id} not found`);
    return found;
  }

  create(dto: CreateH16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
