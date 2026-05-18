import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K04Entity } from './k04.entity';
import { CreateK04Dto } from './dto/create-k04.dto';
import { UpdateK04Dto } from './dto/update-k04.dto';

/**
 * K04 — Delivery Zone Config
 *
 * Defines delivery zones with boundary, delivery charge, and minimum order.
 *
 * Endpoints implemented by K04Controller:
 *   POST   /api/delivery/zones  — Create delivery zone
 *   GET    /api/delivery/zones  — List zones
 *   PUT    /api/delivery/zones/:id  — Update zone
 */
@Injectable()
export class K04Service {
  constructor(
    @InjectRepository(K04Entity)
    private readonly repo: Repository<K04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K04 record ${id} not found`);
    return found;
  }

  create(dto: CreateK04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
