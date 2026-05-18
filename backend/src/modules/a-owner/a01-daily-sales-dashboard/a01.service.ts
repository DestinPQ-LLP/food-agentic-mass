import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A01Entity } from './a01.entity';
import { CreateA01Dto } from './dto/create-a01.dto';
import { UpdateA01Dto } from './dto/update-a01.dto';

/**
 * A01 — Daily Sales Dashboard
 *
 * Real-time view of today's total revenue, order count, and top-selling items for the owner.
 *
 * Endpoints implemented by A01Controller:
 *   GET    /api/owner/daily-sales  — Fetch today's sales summary
 *   GET    /api/owner/daily-sales/items  — Item-wise sales breakdown
 *   GET    /api/owner/daily-sales/hourly  — Hourly revenue timeline
 */
@Injectable()
export class A01Service {
  constructor(
    @InjectRepository(A01Entity)
    private readonly repo: Repository<A01Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A01 record ${id} not found`);
    return found;
  }

  create(dto: CreateA01Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA01Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
