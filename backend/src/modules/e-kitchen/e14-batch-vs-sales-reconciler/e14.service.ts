import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E14Entity } from './e14.entity';
import { CreateE14Dto } from './dto/create-e14.dto';
import { UpdateE14Dto } from './dto/update-e14.dto';

/**
 * E14 — Batch vs Sales Reconciler
 *
 * Compares how much was prepared in each batch against how much was actually sold, showing variance.
 *
 * Endpoints implemented by E14Controller:
 *   GET    /api/kitchen/reconcile/batch-vs-sales  — Batch vs sales for date
 *   GET    /api/kitchen/reconcile/variance  — High variance items
 *   GET    /api/kitchen/reconcile/trend  — Daily variance trend
 */
@Injectable()
export class E14Service {
  constructor(
    @InjectRepository(E14Entity)
    private readonly repo: Repository<E14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E14 record ${id} not found`);
    return found;
  }

  create(dto: CreateE14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
