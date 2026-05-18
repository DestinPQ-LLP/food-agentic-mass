import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F08Entity } from './f08.entity';
import { CreateF08Dto } from './dto/create-f08.dto';
import { UpdateF08Dto } from './dto/update-f08.dto';

/**
 * F08 — Expiry & Freshness Tracker
 *
 * Tracks expiry dates for perishable items and alerts when approaching or past expiry.
 *
 * Endpoints implemented by F08Controller:
 *   PUT    /api/inventory/items/:id/expiry  — Set expiry date for a batch
 *   GET    /api/inventory/items/expiring-soon  — Items expiring within N days
 *   GET    /api/inventory/items/expired  — Expired items
 */
@Injectable()
export class F08Service {
  constructor(
    @InjectRepository(F08Entity)
    private readonly repo: Repository<F08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F08 record ${id} not found`);
    return found;
  }

  create(dto: CreateF08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
