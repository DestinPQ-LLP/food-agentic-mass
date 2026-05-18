import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F05Entity } from './f05.entity';
import { CreateF05Dto } from './dto/create-f05.dto';
import { UpdateF05Dto } from './dto/update-f05.dto';

/**
 * F05 — Consumption Tracker
 *
 * Tracks raw material consumption mapped from production batches and sales order recipes.
 *
 * Endpoints implemented by F05Controller:
 *   GET    /api/inventory/consumption/today  — Today's material consumption
 *   GET    /api/inventory/consumption/items  — Per-item consumption totals
 *   GET    /api/inventory/consumption/trend  — Consumption trend
 */
@Injectable()
export class F05Service {
  constructor(
    @InjectRepository(F05Entity)
    private readonly repo: Repository<F05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F05 record ${id} not found`);
    return found;
  }

  create(dto: CreateF05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
