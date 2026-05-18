import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B03Entity } from './b03.entity';
import { CreateB03Dto } from './dto/create-b03.dto';
import { UpdateB03Dto } from './dto/update-b03.dto';

/**
 * B03 — Combo & Bundle Builder
 *
 * Admin interface to create combos (e.g., Idli + Sambar + Coffee) with a bundled price.
 *
 * Endpoints implemented by B03Controller:
 *   POST   /api/pos/combos  — Create a combo
 *   GET    /api/pos/combos  — List all combos
 *   PUT    /api/pos/combos/:id  — Edit combo
 */
@Injectable()
export class B03Service {
  constructor(
    @InjectRepository(B03Entity)
    private readonly repo: Repository<B03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B03 record ${id} not found`);
    return found;
  }

  create(dto: CreateB03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
