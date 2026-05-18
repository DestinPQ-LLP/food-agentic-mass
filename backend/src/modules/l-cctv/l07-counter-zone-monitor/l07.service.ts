import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L07Entity } from './l07.entity';
import { CreateL07Dto } from './dto/create-l07.dto';
import { UpdateL07Dto } from './dto/update-l07.dto';

/**
 * L07 — Counter Zone Monitor
 *
 * Dedicated view of the billing counter camera.
 *
 * Endpoints implemented by L07Controller:
 *   GET    /api/cctv/zones/counter/stream  — Counter camera stream
 *   GET    /api/cctv/zones/counter/events  — Counter zone events
 *   PUT    /api/cctv/zones/counter/camera  — Configure counter camera
 */
@Injectable()
export class L07Service {
  constructor(
    @InjectRepository(L07Entity)
    private readonly repo: Repository<L07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L07 record ${id} not found`);
    return found;
  }

  create(dto: CreateL07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
