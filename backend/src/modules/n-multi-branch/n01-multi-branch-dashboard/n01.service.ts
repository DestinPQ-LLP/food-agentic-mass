import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N01Entity } from './n01.entity';
import { CreateN01Dto } from './dto/create-n01.dto';
import { UpdateN01Dto } from './dto/update-n01.dto';

/**
 * N01 — Multi-Branch Dashboard
 *
 * Consolidated owner dashboard showing all outlets' KPIs side-by-side.
 *
 * Endpoints implemented by N01Controller:
 *   GET    /api/branches/dashboard  — All branches dashboard data
 *   GET    /api/branches/dashboard/kpis  — KPI comparison across branches
 *   GET    /api/branches/dashboard/alerts  — Cross-branch alerts
 */
@Injectable()
export class N01Service {
  constructor(
    @InjectRepository(N01Entity)
    private readonly repo: Repository<N01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N01 record ${id} not found`);
    return found;
  }

  create(dto: CreateN01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
