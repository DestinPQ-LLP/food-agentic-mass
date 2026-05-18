import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M02Entity } from './m02.entity';
import { CreateM02Dto } from './dto/create-m02.dto';
import { UpdateM02Dto } from './dto/update-m02.dto';

/**
 * M02 — Demand Forecasting Engine
 *
 * Predicts tomorrow's and next 7 days' item demand using sales history and patterns.
 *
 * Endpoints implemented by M02Controller:
 *   GET    /api/ai/forecast/demand  — Demand forecast for next 7 days
 *   GET    /api/ai/forecast/items  — Item-level demand forecast
 *   POST   /api/ai/forecast/override  — Apply manual override to forecast
 */
@Injectable()
export class M02Service {
  constructor(
    @InjectRepository(M02Entity)
    private readonly repo: Repository<M02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M02 record ${id} not found`);
    return found;
  }

  create(dto: CreateM02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
