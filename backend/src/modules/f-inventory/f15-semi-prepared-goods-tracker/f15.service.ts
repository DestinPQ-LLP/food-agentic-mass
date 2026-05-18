import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F15Entity } from './f15.entity';
import { CreateF15Dto } from './dto/create-f15.dto';
import { UpdateF15Dto } from './dto/update-f15.dto';

/**
 * F15 — Semi-Prepared Goods Tracker
 *
 * Tracks batter, chutney, and sambar as separate stock lines between production and sale.
 *
 * Endpoints implemented by F15Controller:
 *   POST   /api/inventory/semi-prep/entry  — Log semi-prep stock entry
 *   GET    /api/inventory/semi-prep/current  — Current semi-prep levels
 *   GET    /api/inventory/semi-prep/log  — Semi-prep stock history
 */
@Injectable()
export class F15Service {
  constructor(
    @InjectRepository(F15Entity)
    private readonly repo: Repository<F15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F15 record ${id} not found`);
    return found;
  }

  create(dto: CreateF15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
