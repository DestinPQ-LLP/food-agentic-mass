import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L11Entity } from './l11.entity';
import { CreateL11Dto } from './dto/create-l11.dto';
import { UpdateL11Dto } from './dto/update-l11.dto';

/**
 * L11 — CCTV Health Monitor
 *
 * Monitors camera connectivity and alerts when a camera goes offline.
 *
 * Endpoints implemented by L11Controller:
 *   GET    /api/cctv/health  — Health status of all cameras
 *   GET    /api/cctv/health/offline  — Offline cameras
 *   POST   /api/cctv/health/alert/send  — Send offline alert
 */
@Injectable()
export class L11Service {
  constructor(
    @InjectRepository(L11Entity)
    private readonly repo: Repository<L11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L11 record ${id} not found`);
    return found;
  }

  create(dto: CreateL11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
