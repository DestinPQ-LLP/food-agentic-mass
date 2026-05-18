import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N15Entity } from './n15.entity';
import { CreateN15Dto } from './dto/create-n15.dto';
import { UpdateN15Dto } from './dto/update-n15.dto';

/**
 * N15 — Inter-Branch Order Routing
 *
 * Routes overflow orders from a busy branch to a nearby branch for preparation.
 *
 * Endpoints implemented by N15Controller:
 *   POST   /api/branches/orders/route  — Route order to another branch
 *   GET    /api/branches/orders/routed  — Orders routed between branches
 *   PUT    /api/branches/routing/rules  — Configure routing rules
 */
@Injectable()
export class N15Service {
  constructor(
    @InjectRepository(N15Entity)
    private readonly repo: Repository<N15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N15 record ${id} not found`);
    return found;
  }

  create(dto: CreateN15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
