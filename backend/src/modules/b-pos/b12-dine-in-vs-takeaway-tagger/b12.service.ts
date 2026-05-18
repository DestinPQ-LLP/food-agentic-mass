import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B12Entity } from './b12.entity';
import { CreateB12Dto } from './dto/create-b12.dto';
import { UpdateB12Dto } from './dto/update-b12.dto';

/**
 * B12 — Dine-in vs Takeaway Tagger
 *
 * Tags each order as dine-in, takeaway, or parcel so kitchen and packaging team can act accordingly.
 *
 * Endpoints implemented by B12Controller:
 *   PUT    /api/pos/orders/:id/type  — Set order type
 *   GET    /api/pos/orders/by-type  — Orders grouped by type
 *   GET    /api/pos/analytics/order-types  — Order type mix analytics
 */
@Injectable()
export class B12Service {
  constructor(
    @InjectRepository(B12Entity)
    private readonly repo: Repository<B12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B12 record ${id} not found`);
    return found;
  }

  create(dto: CreateB12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
