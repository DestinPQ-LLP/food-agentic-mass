import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A10Entity } from './a10.entity';
import { CreateA10Dto } from './dto/create-a10.dto';
import { UpdateA10Dto } from './dto/update-a10.dto';

/**
 * A10 — Vendor Spend Tracker
 *
 * Shows total purchase spend per vendor and per material category across any date range.
 *
 * Endpoints implemented by A10Controller:
 *   GET    /api/owner/vendor-spend  — Spend by vendor and period
 *   GET    /api/owner/vendor-spend/category  — Spend by material category
 *   GET    /api/owner/vendor-spend/trend  — Monthly spend trend
 */
@Injectable()
export class A10Service {
  constructor(
    @InjectRepository(A10Entity)
    private readonly repo: Repository<A10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A10 record ${id} not found`);
    return found;
  }

  create(dto: CreateA10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
