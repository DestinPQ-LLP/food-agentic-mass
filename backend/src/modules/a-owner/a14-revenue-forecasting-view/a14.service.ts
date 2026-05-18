import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A14Entity } from './a14.entity';
import { CreateA14Dto } from './dto/create-a14.dto';
import { UpdateA14Dto } from './dto/update-a14.dto';

/**
 * A14 — Revenue Forecasting View
 *
 * Predicts expected revenue for the next 7 days based on historical sales patterns and day-of-week trends.
 *
 * Endpoints implemented by A14Controller:
 *   GET    /api/owner/forecast/revenue  — 7-day revenue forecast
 *   GET    /api/owner/forecast/items  — Forecasted top items
 *   GET    /api/owner/forecast/confidence  — Forecast confidence scores
 */
@Injectable()
export class A14Service {
  constructor(
    @InjectRepository(A14Entity)
    private readonly repo: Repository<A14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A14 record ${id} not found`);
    return found;
  }

  create(dto: CreateA14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
