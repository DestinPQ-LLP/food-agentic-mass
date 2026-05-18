import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F16Entity } from './f16.entity';
import { CreateF16Dto } from './dto/create-f16.dto';
import { UpdateF16Dto } from './dto/update-f16.dto';

/**
 * F16 — Packaging Material Tracker
 *
 * Tracks stock of boxes, bags, cups, and other packaging separately from food ingredients.
 *
 * Endpoints implemented by F16Controller:
 *   GET    /api/inventory/packaging/stock  — Current packaging stock
 *   POST   /api/inventory/packaging/purchase  — Log packaging purchase
 *   GET    /api/inventory/packaging/consumption  — Packaging consumption by item
 */
@Injectable()
export class F16Service {
  constructor(
    @InjectRepository(F16Entity)
    private readonly repo: Repository<F16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F16 record ${id} not found`);
    return found;
  }

  create(dto: CreateF16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
