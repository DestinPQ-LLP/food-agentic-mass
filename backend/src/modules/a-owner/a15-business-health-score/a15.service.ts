import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A15Entity } from './a15.entity';
import { CreateA15Dto } from './dto/create-a15.dto';
import { UpdateA15Dto } from './dto/update-a15.dto';

/**
 * A15 — Business Health Score
 *
 * A single composite score (0–100) aggregating sales performance, wastage, customer satisfaction, and stock health.
 *
 * Endpoints implemented by A15Controller:
 *   GET    /api/owner/health-score  — Overall health score and components
 *   GET    /api/owner/health-score/history  — Score trend over time
 *   GET    /api/owner/health-score/breakdown  — Category-wise scores
 */
@Injectable()
export class A15Service {
  constructor(
    @InjectRepository(A15Entity)
    private readonly repo: Repository<A15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A15 record ${id} not found`);
    return found;
  }

  create(dto: CreateA15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
