import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L06Entity } from './l06.entity';
import { CreateL06Dto } from './dto/create-l06.dto';
import { UpdateL06Dto } from './dto/update-l06.dto';

/**
 * L06 — Kitchen Zone Monitor
 *
 * Dedicated live view of the kitchen camera for remote monitoring of production activity.
 *
 * Endpoints implemented by L06Controller:
 *   GET    /api/cctv/zones/kitchen/stream  — Kitchen camera stream URL
 *   GET    /api/cctv/zones/kitchen/events  — Kitchen zone events
 *   PUT    /api/cctv/zones/kitchen/camera  — Configure kitchen camera
 */
@Injectable()
export class L06Service {
  constructor(
    @InjectRepository(L06Entity)
    private readonly repo: Repository<L06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L06 record ${id} not found`);
    return found;
  }

  create(dto: CreateL06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
