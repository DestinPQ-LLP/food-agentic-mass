import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A06Entity } from './a06.entity';
import { CreateA06Dto } from './dto/create-a06.dto';
import { UpdateA06Dto } from './dto/update-a06.dto';

/**
 * A06 — Wastage Summary
 *
 * Aggregates all kitchen and inventory wastage entries with cost impact, item breakdown, and trend.
 *
 * Endpoints implemented by A06Controller:
 *   GET    /api/owner/wastage  — Wastage summary by date range
 *   GET    /api/owner/wastage/items  — Per-item wastage totals
 *   GET    /api/owner/wastage/trend  — Daily wastage trend
 */
@Injectable()
export class A06Service {
  constructor(
    @InjectRepository(A06Entity)
    private readonly repo: Repository<A06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A06 record ${id} not found`);
    return found;
  }

  create(dto: CreateA06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
