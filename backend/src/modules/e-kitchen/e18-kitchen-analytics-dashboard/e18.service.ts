import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E18Entity } from './e18.entity';
import { CreateE18Dto } from './dto/create-e18.dto';
import { UpdateE18Dto } from './dto/update-e18.dto';

/**
 * E18 — Kitchen Analytics Dashboard
 *
 * Aggregated kitchen performance metrics: throughput, wastage, prep times, and error rates.
 *
 * Endpoints implemented by E18Controller:
 *   GET    /api/kitchen/analytics  — Kitchen KPIs for date range
 *   GET    /api/kitchen/analytics/items  — Item-wise kitchen analytics
 *   GET    /api/kitchen/analytics/trends  — Trend data for kitchen KPIs
 */
@Injectable()
export class E18Service {
  constructor(
    @InjectRepository(E18Entity)
    private readonly repo: Repository<E18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E18 record ${id} not found`);
    return found;
  }

  create(dto: CreateE18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
