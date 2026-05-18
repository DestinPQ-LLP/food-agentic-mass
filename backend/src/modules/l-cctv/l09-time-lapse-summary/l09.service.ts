import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L09Entity } from './l09.entity';
import { CreateL09Dto } from './dto/create-l09.dto';
import { UpdateL09Dto } from './dto/update-l09.dto';

/**
 * L09 — Time-Lapse Summary
 *
 * Generates a time-lapse video or snapshot grid summarising a day's activity at the store.
 *
 * Endpoints implemented by L09Controller:
 *   POST   /api/cctv/timelapse/generate  — Generate time-lapse for date
 *   GET    /api/cctv/timelapse  — List generated time-lapses
 *   GET    /api/cctv/timelapse/:id/download  — Download time-lapse
 */
@Injectable()
export class L09Service {
  constructor(
    @InjectRepository(L09Entity)
    private readonly repo: Repository<L09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L09 record ${id} not found`);
    return found;
  }

  create(dto: CreateL09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
