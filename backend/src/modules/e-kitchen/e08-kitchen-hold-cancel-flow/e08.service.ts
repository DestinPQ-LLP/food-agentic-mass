import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E08Entity } from './e08.entity';
import { CreateE08Dto } from './dto/create-e08.dto';
import { UpdateE08Dto } from './dto/update-e08.dto';

/**
 * E08 — Kitchen Hold/Cancel Flow
 *
 * Lets kitchen staff hold or cancel specific items with a reason, automatically notifying the counter.
 *
 * Endpoints implemented by E08Controller:
 *   PUT    /api/kitchen/items/:id/hold  — Put item on hold
 *   PUT    /api/kitchen/items/:id/cancel  — Cancel item with reason
 *   GET    /api/kitchen/items/held  — All currently held items
 */
@Injectable()
export class E08Service {
  constructor(
    @InjectRepository(E08Entity)
    private readonly repo: Repository<E08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E08 record ${id} not found`);
    return found;
  }

  create(dto: CreateE08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
