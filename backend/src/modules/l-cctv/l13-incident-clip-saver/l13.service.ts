import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L13Entity } from './l13.entity';
import { CreateL13Dto } from './dto/create-l13.dto';
import { UpdateL13Dto } from './dto/update-l13.dto';

/**
 * L13 — Incident Clip Saver
 *
 * Saves a clip from around the time of an incident for later review or evidence.
 *
 * Endpoints implemented by L13Controller:
 *   POST   /api/cctv/clips/save  — Save clip for time range
 *   GET    /api/cctv/clips  — List saved clips
 *   GET    /api/cctv/clips/:id/download  — Download clip
 */
@Injectable()
export class L13Service {
  constructor(
    @InjectRepository(L13Entity)
    private readonly repo: Repository<L13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L13 record ${id} not found`);
    return found;
  }

  create(dto: CreateL13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
