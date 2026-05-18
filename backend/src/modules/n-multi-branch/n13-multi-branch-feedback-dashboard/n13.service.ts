import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N13Entity } from './n13.entity';
import { CreateN13Dto } from './dto/create-n13.dto';
import { UpdateN13Dto } from './dto/update-n13.dto';

/**
 * N13 — Multi-Branch Feedback Dashboard
 *
 * Consolidated quality ratings and complaints across all outlets.
 *
 * Endpoints implemented by N13Controller:
 *   GET    /api/branches/quality/consolidated  — Quality metrics across branches
 *   GET    /api/branches/quality/compare  — Branch quality comparison
 *   GET    /api/branches/quality/worst  — Branches with worst quality scores
 */
@Injectable()
export class N13Service {
  constructor(
    @InjectRepository(N13Entity)
    private readonly repo: Repository<N13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N13 record ${id} not found`);
    return found;
  }

  create(dto: CreateN13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
