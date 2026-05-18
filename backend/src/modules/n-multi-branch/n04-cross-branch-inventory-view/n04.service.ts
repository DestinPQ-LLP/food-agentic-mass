import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N04Entity } from './n04.entity';
import { CreateN04Dto } from './dto/create-n04.dto';
import { UpdateN04Dto } from './dto/update-n04.dto';

/**
 * N04 — Cross-Branch Inventory View
 *
 * Consolidated view of stock levels across all outlets to identify surpluses and shortfalls.
 *
 * Endpoints implemented by N04Controller:
 *   GET    /api/branches/inventory/consolidated  — Inventory across all branches
 *   GET    /api/branches/inventory/low-stock  — Low stock across branches
 *   GET    /api/branches/inventory/compare  — Branch-wise stock comparison
 */
@Injectable()
export class N04Service {
  constructor(
    @InjectRepository(N04Entity)
    private readonly repo: Repository<N04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N04 record ${id} not found`);
    return found;
  }

  create(dto: CreateN04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
