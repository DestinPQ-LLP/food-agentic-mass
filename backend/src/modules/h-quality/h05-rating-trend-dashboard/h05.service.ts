import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H05Entity } from './h05.entity';
import { CreateH05Dto } from './dto/create-h05.dto';
import { UpdateH05Dto } from './dto/update-h05.dto';

/**
 * H05 — Rating Trend Dashboard
 *
 * Shows star rating averages by day, item, and shift over a selected date range.
 *
 * Endpoints implemented by H05Controller:
 *   GET    /api/quality/ratings/trend  — Rating trend data
 *   GET    /api/quality/ratings/by-item  — Ratings grouped by item
 *   GET    /api/quality/ratings/by-shift  — Ratings grouped by shift
 */
@Injectable()
export class H05Service {
  constructor(
    @InjectRepository(H05Entity)
    private readonly repo: Repository<H05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H05 record ${id} not found`);
    return found;
  }

  create(dto: CreateH05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
