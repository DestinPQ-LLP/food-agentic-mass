import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F09Entity } from './f09.entity';
import { CreateF09Dto } from './dto/create-f09.dto';
import { UpdateF09Dto } from './dto/update-f09.dto';

/**
 * F09 — Stock Variance Report
 *
 * Compares expected stock (opening + purchases - consumption - wastage) against physical closing stock.
 *
 * Endpoints implemented by F09Controller:
 *   GET    /api/inventory/variance/report  — Variance report for date range
 *   GET    /api/inventory/variance/high  — Items with high variance
 *   GET    /api/inventory/variance/trend  — Variance trend over time
 */
@Injectable()
export class F09Service {
  constructor(
    @InjectRepository(F09Entity)
    private readonly repo: Repository<F09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F09 record ${id} not found`);
    return found;
  }

  create(dto: CreateF09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
