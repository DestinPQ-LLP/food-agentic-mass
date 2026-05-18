import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N06Entity } from './n06.entity';
import { CreateN06Dto } from './dto/create-n06.dto';
import { UpdateN06Dto } from './dto/update-n06.dto';

/**
 * N06 — Branch Performance Comparison
 *
 * Ranks all outlets on revenue, orders, wastage, and customer ratings for benchmarking.
 *
 * Endpoints implemented by N06Controller:
 *   GET    /api/branches/performance/compare  — Branch performance comparison
 *   GET    /api/branches/performance/ranking  — Branch ranking by metric
 *   GET    /api/branches/performance/gaps  — Performance gaps across branches
 */
@Injectable()
export class N06Service {
  constructor(
    @InjectRepository(N06Entity)
    private readonly repo: Repository<N06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N06 record ${id} not found`);
    return found;
  }

  create(dto: CreateN06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
