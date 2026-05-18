import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A02Entity } from './a02.entity';
import { CreateA02Dto } from './dto/create-a02.dto';
import { UpdateA02Dto } from './dto/update-a02.dto';

/**
 * A02 — Peak Hour Analytics
 *
 * Heatmap and trend showing which hours and days have highest customer traffic and order volume.
 *
 * Endpoints implemented by A02Controller:
 *   GET    /api/owner/peak-hours  — Hourly order heatmap data
 *   GET    /api/owner/peak-hours/weekly  — Week-on-week peak comparison
 *   GET    /api/owner/peak-hours/top  — Top 3 peak slots today
 */
@Injectable()
export class A02Service {
  constructor(
    @InjectRepository(A02Entity)
    private readonly repo: Repository<A02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A02 record ${id} not found`);
    return found;
  }

  create(dto: CreateA02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
