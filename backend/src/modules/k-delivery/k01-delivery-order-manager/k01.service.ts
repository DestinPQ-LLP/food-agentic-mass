import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K01Entity } from './k01.entity';
import { CreateK01Dto } from './dto/create-k01.dto';
import { UpdateK01Dto } from './dto/update-k01.dto';

/**
 * K01 — Delivery Order Manager
 *
 * Manages all delivery orders: creation, agent assignment, and status tracking.
 *
 * Endpoints implemented by K01Controller:
 *   POST   /api/delivery/orders  — Create delivery order
 *   GET    /api/delivery/orders  — List delivery orders
 *   GET    /api/delivery/orders/active  — Active deliveries
 */
@Injectable()
export class K01Service {
  constructor(
    @InjectRepository(K01Entity)
    private readonly repo: Repository<K01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K01 record ${id} not found`);
    return found;
  }

  create(dto: CreateK01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
