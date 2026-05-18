import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L05Entity } from './l05.entity';
import { CreateL05Dto } from './dto/create-l05.dto';
import { UpdateL05Dto } from './dto/update-l05.dto';

/**
 * L05 — Suspicious Activity Alerter
 *
 * Sends alert when unusual activity is detected outside hours or in restricted zones.
 *
 * Endpoints implemented by L05Controller:
 *   GET    /api/cctv/alerts/suspicious  — Suspicious activity alerts
 *   PUT    /api/cctv/alerts/settings  — Configure alert zones and hours
 *   GET    /api/cctv/alerts/log  — Alert history
 */
@Injectable()
export class L05Service {
  constructor(
    @InjectRepository(L05Entity)
    private readonly repo: Repository<L05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L05 record ${id} not found`);
    return found;
  }

  create(dto: CreateL05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
