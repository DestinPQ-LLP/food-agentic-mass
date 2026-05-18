import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N09Entity } from './n09.entity';
import { CreateN09Dto } from './dto/create-n09.dto';
import { UpdateN09Dto } from './dto/update-n09.dto';

/**
 * N09 — Consolidated P&L Report
 *
 * Combined Profit & Loss across all branches with branch-level drill-down.
 *
 * Endpoints implemented by N09Controller:
 *   GET    /api/branches/pnl/consolidated  — Consolidated P&L for period
 *   GET    /api/branches/pnl/:branchId  — Branch-level P&L
 *   GET    /api/branches/pnl/compare  — Branch P&L comparison
 */
@Injectable()
export class N09Service {
  constructor(
    @InjectRepository(N09Entity)
    private readonly repo: Repository<N09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N09 record ${id} not found`);
    return found;
  }

  create(dto: CreateN09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
