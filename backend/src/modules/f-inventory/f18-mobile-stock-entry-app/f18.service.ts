import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { F18Entity } from './f18.entity';
import { CreateF18Dto } from './dto/create-f18.dto';
import { UpdateF18Dto } from './dto/update-f18.dto';

/**
 * F18 — Mobile Stock Entry App
 *
 * Mobile-friendly interface for staff to enter stock counts from the storage room.
 *
 * Endpoints implemented by F18Controller:
 *   POST   /api/inventory/mobile/count  — Submit mobile stock count
 *   GET    /api/inventory/mobile/items  — Items for mobile entry
 *   GET    /api/inventory/mobile/pending  — Pending mobile submissions
 */
@Injectable()
export class F18Service {
  constructor(
    @InjectRepository(F18Entity)
    private readonly repo: Repository<F18Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`F18 record ${id} not found`);
    return found;
  }

  create(dto: CreateF18Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateF18Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
