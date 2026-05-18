import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A03Entity } from './a03.entity';
import { CreateA03Dto } from './dto/create-a03.dto';
import { UpdateA03Dto } from './dto/update-a03.dto';

/**
 * A03 — Product Movement Report
 *
 * Shows which menu items are selling fast, slow, or stagnant across any date range.
 *
 * Endpoints implemented by A03Controller:
 *   GET    /api/owner/product-movement  — Item sales volume and revenue
 *   GET    /api/owner/product-movement/slow  — Slow-moving items list
 *   GET    /api/owner/product-movement/top  — Top 10 items by revenue
 */
@Injectable()
export class A03Service {
  constructor(
    @InjectRepository(A03Entity)
    private readonly repo: Repository<A03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A03 record ${id} not found`);
    return found;
  }

  create(dto: CreateA03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
