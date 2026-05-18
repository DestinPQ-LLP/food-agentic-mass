import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L10Entity } from './l10.entity';
import { CreateL10Dto } from './dto/create-l10.dto';
import { UpdateL10Dto } from './dto/update-l10.dto';

/**
 * L10 — Motion Detection Alert
 *
 * Alerts when motion is detected during configured off-hours or in restricted areas.
 *
 * Endpoints implemented by L10Controller:
 *   GET    /api/cctv/motion/alerts  — Motion detection alerts
 *   PUT    /api/cctv/motion/settings  — Configure motion zones and hours
 *   GET    /api/cctv/motion/log  — Motion alert history
 */
@Injectable()
export class L10Service {
  constructor(
    @InjectRepository(L10Entity)
    private readonly repo: Repository<L10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L10 record ${id} not found`);
    return found;
  }

  create(dto: CreateL10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
