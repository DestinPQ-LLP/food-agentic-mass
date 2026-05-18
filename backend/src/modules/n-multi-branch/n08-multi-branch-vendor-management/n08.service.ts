import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N08Entity } from './n08.entity';
import { CreateN08Dto } from './dto/create-n08.dto';
import { UpdateN08Dto } from './dto/update-n08.dto';

/**
 * N08 — Multi-Branch Vendor Management
 *
 * Shared vendor master with branch-specific pricing and order tracking.
 *
 * Endpoints implemented by N08Controller:
 *   GET    /api/branches/vendors  — Global vendor list
 *   POST   /api/branches/vendors/:vendorId/purchase-orders  — PO for specific branch
 *   GET    /api/branches/vendors/spend/consolidated  — Consolidated vendor spend
 */
@Injectable()
export class N08Service {
  constructor(
    @InjectRepository(N08Entity)
    private readonly repo: Repository<N08Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N08 record ${id} not found`);
    return found;
  }

  create(dto: CreateN08Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN08Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
