import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E01Entity } from './e01.entity';
import { CreateE01Dto } from './dto/create-e01.dto';
import { UpdateE01Dto } from './dto/update-e01.dto';

/**
 * E01 — Kitchen Display System
 *
 * Live screen for kitchen staff showing all active orders with item details and status buttons.
 *
 * Endpoints implemented by E01Controller:
 *   GET    /api/kitchen/orders/live  — Live order queue for kitchen
 *   PUT    /api/kitchen/orders/:id/status  — Update order status
 *   GET    /api/kitchen/orders/live/count  — Count of live orders
 */
@Injectable()
export class E01Service {
  constructor(
    @InjectRepository(E01Entity)
    private readonly repo: Repository<E01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E01 record ${id} not found`);
    return found;
  }

  create(dto: CreateE01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
