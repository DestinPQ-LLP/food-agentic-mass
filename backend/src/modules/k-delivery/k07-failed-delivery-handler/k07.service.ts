import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K07Entity } from './k07.entity';
import { CreateK07Dto } from './dto/create-k07.dto';
import { UpdateK07Dto } from './dto/update-k07.dto';

/**
 * K07 — Failed Delivery Handler
 *
 * Manages undelivered orders: records reason, triggers re-delivery or refund.
 *
 * Endpoints implemented by K07Controller:
 *   POST   /api/delivery/orders/:id/fail  — Mark delivery as failed
 *   GET    /api/delivery/orders/failed  — Failed deliveries
 *   POST   /api/delivery/orders/:id/retry  — Schedule re-delivery
 */
@Injectable()
export class K07Service {
  constructor(
    @InjectRepository(K07Entity)
    private readonly repo: Repository<K07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K07 record ${id} not found`);
    return found;
  }

  create(dto: CreateK07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
