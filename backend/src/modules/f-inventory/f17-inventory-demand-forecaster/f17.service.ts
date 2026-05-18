import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F17Entity } from './f17.entity';
import { CreateF17Dto } from './dto/create-f17.dto';
import { UpdateF17Dto } from './dto/update-f17.dto';

/**
 * F17 — Inventory Demand Forecaster
 *
 * Predicts how much of each material to procure based on sales forecast and current stock.
 *
 * Endpoints implemented by F17Controller:
 *   GET    /api/inventory/forecast/procurement  — Recommended procurement quantities
 *   GET    /api/inventory/forecast/items  — Per-item demand forecast
 *   PUT    /api/inventory/forecast/settings  — Configure forecast horizon
 */
@Injectable()
export class F17Service {
  constructor(
    @InjectRepository(F17Entity)
    private readonly repo: Repository<F17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F17 record ${id} not found`);
    return found;
  }

  create(dto: CreateF17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
