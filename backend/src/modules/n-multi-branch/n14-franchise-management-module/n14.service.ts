import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N14Entity } from './n14.entity';
import { CreateN14Dto } from './dto/create-n14.dto';
import { UpdateN14Dto } from './dto/update-n14.dto';

/**
 * N14 — Franchise Management Module
 *
 * Manages franchise-specific configurations: royalty tracking, SOP compliance, and audit scores.
 *
 * Endpoints implemented by N14Controller:
 *   GET    /api/branches/franchise/royalties  — Royalty calculations per franchise
 *   POST   /api/branches/franchise/audit  — Submit franchise audit score
 *   GET    /api/branches/franchise/compliance  — SOP compliance per franchise
 */
@Injectable()
export class N14Service {
  constructor(
    @InjectRepository(N14Entity)
    private readonly repo: Repository<N14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N14 record ${id} not found`);
    return found;
  }

  create(dto: CreateN14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
