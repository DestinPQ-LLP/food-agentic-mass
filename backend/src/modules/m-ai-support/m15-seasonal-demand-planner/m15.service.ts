import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M15Entity } from './m15.entity';
import { CreateM15Dto } from './dto/create-m15.dto';
import { UpdateM15Dto } from './dto/update-m15.dto';

/**
 * M15 — Seasonal Demand Planner
 *
 * Models how festivals, school holidays, and weather seasons affect demand.
 *
 * Endpoints implemented by M15Controller:
 *   GET    /api/ai/seasonal/forecast  — Seasonal demand adjustments
 *   POST   /api/ai/seasonal/events  — Add custom event/season
 *   GET    /api/ai/seasonal/calendar  — Seasonal events calendar
 */
@Injectable()
export class M15Service {
  constructor(
    @InjectRepository(M15Entity)
    private readonly repo: Repository<M15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M15 record ${id} not found`);
    return found;
  }

  create(dto: CreateM15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
