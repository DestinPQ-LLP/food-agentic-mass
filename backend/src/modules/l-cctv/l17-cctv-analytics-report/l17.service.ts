import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L17Entity } from './l17.entity';
import { CreateL17Dto } from './dto/create-l17.dto';
import { UpdateL17Dto } from './dto/update-l17.dto';

/**
 * L17 — CCTV Analytics Report
 *
 * Aggregated weekly/monthly report of footfall, peak periods, and event counts.
 *
 * Endpoints implemented by L17Controller:
 *   GET    /api/cctv/analytics/report  — CCTV analytics report for period
 *   GET    /api/cctv/analytics/footfall  — Footfall analytics
 *   GET    /api/cctv/analytics/events  — Event frequency analytics
 */
@Injectable()
export class L17Service {
  constructor(
    @InjectRepository(L17Entity)
    private readonly repo: Repository<L17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L17 record ${id} not found`);
    return found;
  }

  create(dto: CreateL17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
