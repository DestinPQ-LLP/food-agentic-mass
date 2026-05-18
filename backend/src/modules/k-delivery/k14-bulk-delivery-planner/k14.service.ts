import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K14Entity } from './k14.entity';
import { CreateK14Dto } from './dto/create-k14.dto';
import { UpdateK14Dto } from './dto/update-k14.dto';

/**
 * K14 — Bulk Delivery Planner
 *
 * Plans logistics for large catering or event deliveries with route and timing.
 *
 * Endpoints implemented by K14Controller:
 *   POST   /api/delivery/bulk-plans  — Create bulk delivery plan
 *   GET    /api/delivery/bulk-plans  — List bulk delivery plans
 *   PUT    /api/delivery/bulk-plans/:id/status  — Update plan status
 */
@Injectable()
export class K14Service {
  constructor(
    @InjectRepository(K14Entity)
    private readonly repo: Repository<K14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K14 record ${id} not found`);
    return found;
  }

  create(dto: CreateK14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
