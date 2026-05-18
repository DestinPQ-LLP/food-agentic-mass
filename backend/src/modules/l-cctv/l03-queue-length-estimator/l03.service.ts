import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L03Entity } from './l03.entity';
import { CreateL03Dto } from './dto/create-l03.dto';
import { UpdateL03Dto } from './dto/update-l03.dto';

/**
 * L03 — Queue Length Estimator
 *
 * Estimates current queue size at the counter from camera analysis.
 *
 * Endpoints implemented by L03Controller:
 *   GET    /api/cctv/queue/current  — Current queue length estimate
 *   GET    /api/cctv/queue/trend  — Queue length over time today
 *   PUT    /api/cctv/queue/camera  — Set queue camera
 */
@Injectable()
export class L03Service {
  constructor(
    @InjectRepository(L03Entity)
    private readonly repo: Repository<L03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L03 record ${id} not found`);
    return found;
  }

  create(dto: CreateL03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
