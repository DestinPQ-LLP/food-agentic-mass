import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L02Entity } from './l02.entity';
import { CreateL02Dto } from './dto/create-l02.dto';
import { UpdateL02Dto } from './dto/update-l02.dto';

/**
 * L02 — Camera-Based Footfall Counter
 *
 * Uses computer vision to count customers entering the store from camera feed.
 *
 * Endpoints implemented by L02Controller:
 *   GET    /api/cctv/footfall/live  — Live footfall count
 *   GET    /api/cctv/footfall/hourly  — Hourly footfall data
 *   PUT    /api/cctv/footfall/camera  — Configure counting camera
 */
@Injectable()
export class L02Service {
  constructor(
    @InjectRepository(L02Entity)
    private readonly repo: Repository<L02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L02 record ${id} not found`);
    return found;
  }

  create(dto: CreateL02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
