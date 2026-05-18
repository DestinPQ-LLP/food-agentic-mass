import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E03Entity } from './e03.entity';
import { CreateE03Dto } from './dto/create-e03.dto';
import { UpdateE03Dto } from './dto/update-e03.dto';

/**
 * E03 — Preparation Status Updater
 *
 * Granular status updates per order item: received, preparing, ready, served, wasted.
 *
 * Endpoints implemented by E03Controller:
 *   PUT    /api/kitchen/items/:id/status  — Update item preparation status
 *   GET    /api/kitchen/items/status-summary  — Count by status
 *   GET    /api/kitchen/items/in-progress  — Items currently being prepared
 */
@Injectable()
export class E03Service {
  constructor(
    @InjectRepository(E03Entity)
    private readonly repo: Repository<E03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E03 record ${id} not found`);
    return found;
  }

  create(dto: CreateE03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
