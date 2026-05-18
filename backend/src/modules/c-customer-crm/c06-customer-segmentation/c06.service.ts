import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C06Entity } from './c06.entity';
import { CreateC06Dto } from './dto/create-c06.dto';
import { UpdateC06Dto } from './dto/update-c06.dto';

/**
 * C06 — Customer Segmentation
 *
 * Auto-classifies customers as New, Regular, VIP, or Lapsed based on visit frequency and spend.
 *
 * Endpoints implemented by C06Controller:
 *   GET    /api/crm/segments  — Get customer segment counts
 *   GET    /api/crm/segments/:segment/customers  — Customers in a segment
 *   PUT    /api/crm/segments/rules  — Update segmentation rules
 */
@Injectable()
export class C06Service {
  constructor(
    @InjectRepository(C06Entity)
    private readonly repo: Repository<C06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C06 record ${id} not found`);
    return found;
  }

  create(dto: CreateC06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
