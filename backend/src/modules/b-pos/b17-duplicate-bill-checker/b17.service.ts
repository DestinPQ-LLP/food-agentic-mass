import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B17Entity } from './b17.entity';
import { CreateB17Dto } from './dto/create-b17.dto';
import { UpdateB17Dto } from './dto/update-b17.dto';

/**
 * B17 — Duplicate Bill Checker
 *
 * Detects potential duplicate orders based on same item set, time window, and customer within a configurable window.
 *
 * Endpoints implemented by B17Controller:
 *   GET    /api/pos/orders/duplicates  — Potential duplicate orders
 *   POST   /api/pos/orders/:id/mark-duplicate  — Flag as duplicate
 *   PUT    /api/pos/orders/duplicates/settings  — Configure detection window
 */
@Injectable()
export class B17Service {
  constructor(
    @InjectRepository(B17Entity)
    private readonly repo: Repository<B17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`B17 record ${id} not found`);
    return found;
  }

  create(dto: CreateB17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateB17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
