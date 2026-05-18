import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F01Entity } from './f01.entity';
import { CreateF01Dto } from './dto/create-f01.dto';
import { UpdateF01Dto } from './dto/update-f01.dto';

/**
 * F01 — Raw Material Master
 *
 * Master list of all raw materials with name, unit, reorder level, and vendor mapping.
 *
 * Endpoints implemented by F01Controller:
 *   POST   /api/inventory/items  — Create inventory item
 *   GET    /api/inventory/items  — List all items
 *   PUT    /api/inventory/items/:id  — Update item
 */
@Injectable()
export class F01Service {
  constructor(
    @InjectRepository(F01Entity)
    private readonly repo: Repository<F01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F01 record ${id} not found`);
    return found;
  }

  create(dto: CreateF01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
