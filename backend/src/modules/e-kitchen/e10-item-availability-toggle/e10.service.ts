import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E10Entity } from './e10.entity';
import { CreateE10Dto } from './dto/create-e10.dto';
import { UpdateE10Dto } from './dto/update-e10.dto';

/**
 * E10 — Item Availability Toggle
 *
 * Allows kitchen to mark items as temporarily unavailable (e.g., batter finished) so POS reflects it.
 *
 * Endpoints implemented by E10Controller:
 *   PUT    /api/kitchen/availability/:itemId  — Toggle item availability
 *   GET    /api/kitchen/availability  — All items with availability status
 *   GET    /api/kitchen/availability/unavailable  — Currently unavailable items
 */
@Injectable()
export class E10Service {
  constructor(
    @InjectRepository(E10Entity)
    private readonly repo: Repository<E10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E10 record ${id} not found`);
    return found;
  }

  create(dto: CreateE10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
