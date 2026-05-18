import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K03Entity } from './k03.entity';
import { CreateK03Dto } from './dto/create-k03.dto';
import { UpdateK03Dto } from './dto/update-k03.dto';

/**
 * K03 — Delivery Status Tracker
 *
 * Real-time tracking of delivery order status: dispatched, in-transit, delivered, failed.
 *
 * Endpoints implemented by K03Controller:
 *   PUT    /api/delivery/orders/:id/status  — Update delivery status
 *   GET    /api/delivery/orders/:id/timeline  — Status timeline for order
 *   GET    /api/delivery/orders/in-transit  — All in-transit orders
 */
@Injectable()
export class K03Service {
  constructor(
    @InjectRepository(K03Entity)
    private readonly repo: Repository<K03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K03 record ${id} not found`);
    return found;
  }

  create(dto: CreateK03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
