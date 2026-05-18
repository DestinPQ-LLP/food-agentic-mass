import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F14Entity } from './f14.entity';
import { CreateF14Dto } from './dto/create-f14.dto';
import { UpdateF14Dto } from './dto/update-f14.dto';

/**
 * F14 — Shrinkage & Loss Report
 *
 * Reports unaccounted stock reduction (shrinkage) not explained by consumption, sales, or wastage.
 *
 * Endpoints implemented by F14Controller:
 *   GET    /api/inventory/shrinkage/report  — Shrinkage report for period
 *   GET    /api/inventory/shrinkage/items  — Items with highest shrinkage
 *   GET    /api/inventory/shrinkage/trend  — Shrinkage trend
 */
@Injectable()
export class F14Service {
  constructor(
    @InjectRepository(F14Entity)
    private readonly repo: Repository<F14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F14 record ${id} not found`);
    return found;
  }

  create(dto: CreateF14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
