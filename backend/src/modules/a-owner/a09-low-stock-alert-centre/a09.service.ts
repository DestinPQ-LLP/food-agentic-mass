import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A09Entity } from './a09.entity';
import { CreateA09Dto } from './dto/create-a09.dto';
import { UpdateA09Dto } from './dto/update-a09.dto';

/**
 * A09 — Low Stock Alert Centre
 *
 * Consolidated view of all inventory items currently below their reorder threshold.
 *
 * Endpoints implemented by A09Controller:
 *   GET    /api/owner/low-stock  — All items below reorder level
 *   PUT    /api/owner/low-stock/:itemId/acknowledge  — Acknowledge alert
 *   GET    /api/owner/low-stock/critical  — Items at zero stock
 */
@Injectable()
export class A09Service {
  constructor(
    @InjectRepository(A09Entity)
    private readonly repo: Repository<A09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A09 record ${id} not found`);
    return found;
  }

  create(dto: CreateA09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
