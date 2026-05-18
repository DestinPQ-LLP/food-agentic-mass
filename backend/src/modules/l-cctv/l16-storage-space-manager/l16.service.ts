import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L16Entity } from './l16.entity';
import { CreateL16Dto } from './dto/create-l16.dto';
import { UpdateL16Dto } from './dto/update-l16.dto';

/**
 * L16 — Storage Space Manager
 *
 * Monitors CCTV storage consumption and alerts when disk space is low.
 *
 * Endpoints implemented by L16Controller:
 *   GET    /api/cctv/storage/status  — Storage usage status
 *   GET    /api/cctv/storage/cameras  — Storage per camera
 *   POST   /api/cctv/storage/cleanup  — Trigger clip cleanup
 */
@Injectable()
export class L16Service {
  constructor(
    @InjectRepository(L16Entity)
    private readonly repo: Repository<L16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L16 record ${id} not found`);
    return found;
  }

  create(dto: CreateL16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
