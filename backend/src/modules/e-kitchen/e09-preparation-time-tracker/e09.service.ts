import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E09Entity } from './e09.entity';
import { CreateE09Dto } from './dto/create-e09.dto';
import { UpdateE09Dto } from './dto/update-e09.dto';

/**
 * E09 — Preparation Time Tracker
 *
 * Logs the time taken from order receipt to completion, used for performance analytics.
 *
 * Endpoints implemented by E09Controller:
 *   POST   /api/kitchen/prep-time/start  — Mark preparation start
 *   POST   /api/kitchen/prep-time/end  — Mark preparation complete
 *   GET    /api/kitchen/prep-time/analytics  — Average prep times by item
 */
@Injectable()
export class E09Service {
  constructor(
    @InjectRepository(E09Entity)
    private readonly repo: Repository<E09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E09 record ${id} not found`);
    return found;
  }

  create(dto: CreateE09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
