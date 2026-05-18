import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L15Entity } from './l15.entity';
import { CreateL15Dto } from './dto/create-l15.dto';
import { UpdateL15Dto } from './dto/update-l15.dto';

/**
 * L15 — Ethical Staff Activity Monitor
 *
 * Aggregate analytics on counter activity volumes (not individual surveillance); consent-required.
 *
 * Endpoints implemented by L15Controller:
 *   GET    /api/cctv/staff-activity/summary  — Aggregate staff activity analytics
 *   PUT    /api/cctv/staff-activity/settings  — Configure monitoring parameters
 *   GET    /api/cctv/staff-activity/trend  — Activity trend
 */
@Injectable()
export class L15Service {
  constructor(
    @InjectRepository(L15Entity)
    private readonly repo: Repository<L15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L15 record ${id} not found`);
    return found;
  }

  create(dto: CreateL15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
