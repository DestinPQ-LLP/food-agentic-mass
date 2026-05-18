import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K02Entity } from './k02.entity';
import { CreateK02Dto } from './dto/create-k02.dto';
import { UpdateK02Dto } from './dto/update-k02.dto';

/**
 * K02 — Delivery Agent Assignment
 *
 * Assigns delivery orders to available agents with workload visibility.
 *
 * Endpoints implemented by K02Controller:
 *   GET    /api/delivery/agents  — List delivery agents
 *   PUT    /api/delivery/orders/:id/assign  — Assign agent to order
 *   GET    /api/delivery/agents/:id/orders  — Agent's active orders
 */
@Injectable()
export class K02Service {
  constructor(
    @InjectRepository(K02Entity)
    private readonly repo: Repository<K02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K02 record ${id} not found`);
    return found;
  }

  create(dto: CreateK02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
