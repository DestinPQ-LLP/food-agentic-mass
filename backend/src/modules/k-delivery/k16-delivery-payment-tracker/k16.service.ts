import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K16Entity } from './k16.entity';
import { CreateK16Dto } from './dto/create-k16.dto';
import { UpdateK16Dto } from './dto/update-k16.dto';

/**
 * K16 — Delivery Payment Tracker
 *
 * Tracks cash-on-delivery collections and online payments for delivery orders.
 *
 * Endpoints implemented by K16Controller:
 *   POST   /api/delivery/payments/collect  — Record COD collection
 *   GET    /api/delivery/payments/pending  — Pending COD collections
 *   GET    /api/delivery/payments/summary  — Payment collection summary
 */
@Injectable()
export class K16Service {
  constructor(
    @InjectRepository(K16Entity)
    private readonly repo: Repository<K16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K16 record ${id} not found`);
    return found;
  }

  create(dto: CreateK16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
