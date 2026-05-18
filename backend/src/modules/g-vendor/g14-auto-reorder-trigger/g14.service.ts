import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { G14Entity } from './g14.entity';
import { CreateG14Dto } from './dto/create-g14.dto';
import { UpdateG14Dto } from './dto/update-g14.dto';

/**
 * G14 — Auto-Reorder Trigger
 *
 * Automatically creates a purchase request when a material drops below its reorder level.
 *
 * Endpoints implemented by G14Controller:
 *   GET    /api/vendors/auto-reorder/triggered  — Auto-triggered reorder requests
 *   PUT    /api/vendors/auto-reorder/settings  — Enable/disable auto-reorder
 *   GET    /api/vendors/auto-reorder/log  — Trigger history
 */
@Injectable()
export class G14Service {
  constructor(
    @InjectRepository(G14Entity)
    private readonly repo: Repository<G14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`G14 record ${id} not found`);
    return found;
  }

  create(dto: CreateG14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateG14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
