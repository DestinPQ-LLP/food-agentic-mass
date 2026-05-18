import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K10Entity } from './k10.entity';
import { CreateK10Dto } from './dto/create-k10.dto';
import { UpdateK10Dto } from './dto/update-k10.dto';

/**
 * K10 — Zomato/Swiggy Integration
 *
 * Syncs online aggregator orders into the system automatically.
 *
 * Endpoints implemented by K10Controller:
 *   POST   /api/delivery/aggregators/webhook  — Aggregator webhook receiver
 *   GET    /api/delivery/aggregators/orders  — Orders from aggregators
 *   PUT    /api/delivery/aggregators/settings  — Configure aggregator credentials
 */
@Injectable()
export class K10Service {
  constructor(
    @InjectRepository(K10Entity)
    private readonly repo: Repository<K10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K10 record ${id} not found`);
    return found;
  }

  create(dto: CreateK10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
