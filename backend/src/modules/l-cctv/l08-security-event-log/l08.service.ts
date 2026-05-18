import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L08Entity } from './l08.entity';
import { CreateL08Dto } from './dto/create-l08.dto';
import { UpdateL08Dto } from './dto/update-l08.dto';

/**
 * L08 — Security Event Log
 *
 * Chronological log of all CCTV-triggered security events with timestamps and camera references.
 *
 * Endpoints implemented by L08Controller:
 *   GET    /api/cctv/events  — All security events
 *   GET    /api/cctv/events/:id  — Event detail with snapshot
 *   PUT    /api/cctv/events/:id/acknowledge  — Acknowledge event
 */
@Injectable()
export class L08Service {
  constructor(
    @InjectRepository(L08Entity)
    private readonly repo: Repository<L08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L08 record ${id} not found`);
    return found;
  }

  create(dto: CreateL08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
