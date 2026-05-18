import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { N17Entity } from './n17.entity';
import { CreateN17Dto } from './dto/create-n17.dto';
import { UpdateN17Dto } from './dto/update-n17.dto';

/**
 * N17 — Multi-Branch Accounts
 *
 * Consolidated accounts view covering revenue, expenses, and P&L across all branches.
 *
 * Endpoints implemented by N17Controller:
 *   GET    /api/branches/accounts/consolidated  — Consolidated accounts
 *   GET    /api/branches/accounts/revenue  — Revenue by branch
 *   GET    /api/branches/accounts/expenses  — Expenses by branch
 */
@Injectable()
export class N17Service {
  constructor(
    @InjectRepository(N17Entity)
    private readonly repo: Repository<N17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`N17 record ${id} not found`);
    return found;
  }

  create(dto: CreateN17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateN17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
