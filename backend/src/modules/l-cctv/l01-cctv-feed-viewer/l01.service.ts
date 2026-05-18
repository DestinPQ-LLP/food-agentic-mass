import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L01Entity } from './l01.entity';
import { CreateL01Dto } from './dto/create-l01.dto';
import { UpdateL01Dto } from './dto/update-l01.dto';

/**
 * L01 — CCTV Feed Viewer
 *
 * Live camera feed viewer embedded in the dashboard for owner/manager monitoring.
 *
 * Endpoints implemented by L01Controller:
 *   GET    /api/cctv/cameras  — List connected cameras
 *   GET    /api/cctv/cameras/:id/stream  — Stream URL for camera
 *   PUT    /api/cctv/cameras/:id/settings  — Camera settings
 */
@Injectable()
export class L01Service {
  constructor(
    @InjectRepository(L01Entity)
    private readonly repo: Repository<L01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L01 record ${id} not found`);
    return found;
  }

  create(dto: CreateL01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
