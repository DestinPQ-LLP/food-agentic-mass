import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E07Entity } from './e07.entity';
import { CreateE07Dto } from './dto/create-e07.dto';
import { UpdateE07Dto } from './dto/update-e07.dto';

/**
 * E07 — Wastage Entry Screen
 *
 * Kitchen staff logs food wastage by item and reason code to build a wastage history.
 *
 * Endpoints implemented by E07Controller:
 *   POST   /api/kitchen/wastage  — Log a wastage entry
 *   GET    /api/kitchen/wastage/today  — Today's wastage log
 *   GET    /api/kitchen/wastage/items  — Wastage totals by item
 */
@Injectable()
export class E07Service {
  constructor(
    @InjectRepository(E07Entity)
    private readonly repo: Repository<E07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E07 record ${id} not found`);
    return found;
  }

  create(dto: CreateE07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
