import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E16Entity } from './e16.entity';
import { CreateE16Dto } from './dto/create-e16.dto';
import { UpdateE16Dto } from './dto/update-e16.dto';

/**
 * E16 — Multi-Station Manager
 *
 * Organises the kitchen into stations (dosa, idli, beverages) each with their own queue.
 *
 * Endpoints implemented by E16Controller:
 *   GET    /api/kitchen/stations  — List all stations
 *   PUT    /api/kitchen/orders/:id/station  — Assign order item to station
 *   GET    /api/kitchen/stations/:id/queue  — Queue for a specific station
 */
@Injectable()
export class E16Service {
  constructor(
    @InjectRepository(E16Entity)
    private readonly repo: Repository<E16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E16 record ${id} not found`);
    return found;
  }

  create(dto: CreateE16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
