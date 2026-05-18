import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A05Entity } from './a05.entity';
import { CreateA05Dto } from './dto/create-a05.dto';
import { UpdateA05Dto } from './dto/update-a05.dto';

/**
 * A05 — Profit & Loss Overview
 *
 * Calculates revenue minus cost-of-goods and operating expenses to give an estimated P&L for any period.
 *
 * Endpoints implemented by A05Controller:
 *   GET    /api/owner/pnl  — P&L for date range
 *   GET    /api/owner/pnl/monthly  — Month-wise P&L trend
 *   GET    /api/owner/pnl/items  — Item-level margin breakdown
 */
@Injectable()
export class A05Service {
  constructor(
    @InjectRepository(A05Entity)
    private readonly repo: Repository<A05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A05 record ${id} not found`);
    return found;
  }

  create(dto: CreateA05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
