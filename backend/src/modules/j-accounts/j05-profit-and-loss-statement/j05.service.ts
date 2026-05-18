import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J05Entity } from './j05.entity';
import { CreateJ05Dto } from './dto/create-j05.dto';
import { UpdateJ05Dto } from './dto/update-j05.dto';

/**
 * J05 — Profit & Loss Statement
 *
 * Formal P&L for any date range: revenue, COGS, operating expenses, and net profit.
 *
 * Endpoints implemented by J05Controller:
 *   GET    /api/accounts/pnl  — P&L statement for period
 *   GET    /api/accounts/pnl/monthly  — Monthly P&L trend
 *   GET    /api/accounts/pnl/export  — Export P&L as PDF
 */
@Injectable()
export class J05Service {
  constructor(
    @InjectRepository(J05Entity)
    private readonly repo: Repository<J05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J05 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
