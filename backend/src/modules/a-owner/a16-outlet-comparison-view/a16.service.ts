import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A16Entity } from './a16.entity';
import { CreateA16Dto } from './dto/create-a16.dto';
import { UpdateA16Dto } from './dto/update-a16.dto';

/**
 * A16 — Outlet Comparison View
 *
 * Side-by-side performance comparison of multiple outlets across key metrics (multi-branch).
 *
 * Endpoints implemented by A16Controller:
 *   GET    /api/owner/outlet-compare  — Compare all outlets
 *   GET    /api/owner/outlet-compare/:metric  — Compare by specific metric
 *   GET    /api/owner/outlet-compare/rank  — Rank outlets by performance
 */
@Injectable()
export class A16Service {
  constructor(
    @InjectRepository(A16Entity)
    private readonly repo: Repository<A16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A16 record ${id} not found`);
    return found;
  }

  create(dto: CreateA16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
