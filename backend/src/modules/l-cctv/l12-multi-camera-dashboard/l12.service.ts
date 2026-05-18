import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L12Entity } from './l12.entity';
import { CreateL12Dto } from './dto/create-l12.dto';
import { UpdateL12Dto } from './dto/update-l12.dto';

/**
 * L12 — Multi-Camera Dashboard
 *
 * Side-by-side view of all camera feeds in a single responsive grid.
 *
 * Endpoints implemented by L12Controller:
 *   GET    /api/cctv/cameras/streams  — All camera stream URLs
 *   PUT    /api/cctv/cameras/grid-layout  — Save grid layout
 *   GET    /api/cctv/cameras/grid-layout  — Get saved grid layout
 */
@Injectable()
export class L12Service {
  constructor(
    @InjectRepository(L12Entity)
    private readonly repo: Repository<L12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L12 record ${id} not found`);
    return found;
  }

  create(dto: CreateL12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
