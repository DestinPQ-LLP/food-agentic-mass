import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J11Entity } from './j11.entity';
import { CreateJ11Dto } from './dto/create-j11.dto';
import { UpdateJ11Dto } from './dto/update-j11.dto';

/**
 * J11 — Bank Reconciliation
 *
 * Matches bank statement credits and debits to system transactions.
 *
 * Endpoints implemented by J11Controller:
 *   POST   /api/accounts/bank/reconcile  — Upload bank statement
 *   GET    /api/accounts/bank/unmatched  — Unmatched bank transactions
 *   GET    /api/accounts/bank/reconciliation-report  — Reconciliation report
 */
@Injectable()
export class J11Service {
  constructor(
    @InjectRepository(J11Entity)
    private readonly repo: Repository<J11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J11 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
