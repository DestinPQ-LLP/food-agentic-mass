import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N18Entity } from './n18.entity';
import { CreateN18Dto } from './dto/create-n18.dto';
import { UpdateN18Dto } from './dto/update-n18.dto';

/**
 * N18 — Expansion Planning Dashboard
 *
 * Tracks new outlet setup progress with checklists, timelines, and capital tracking.
 *
 * Endpoints implemented by N18Controller:
 *   POST   /api/branches/expansion/plans  — Create expansion plan
 *   GET    /api/branches/expansion/plans  — List expansion plans
 *   PUT    /api/branches/expansion/plans/:id/progress  — Update plan progress
 */
@Injectable()
export class N18Service {
  constructor(
    @InjectRepository(N18Entity)
    private readonly repo: Repository<N18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N18 record ${id} not found`);
    return found;
  }

  create(dto: CreateN18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
