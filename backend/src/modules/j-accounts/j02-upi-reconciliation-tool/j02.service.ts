import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J02Entity } from './j02.entity';
import { CreateJ02Dto } from './dto/create-j02.dto';
import { UpdateJ02Dto } from './dto/update-j02.dto';

/**
 * J02 — UPI Reconciliation Tool
 *
 * Matches UPI settlement amounts from the payment app against system-recorded UPI orders.
 *
 * Endpoints implemented by J02Controller:
 *   POST   /api/accounts/upi/reconcile  — Submit UPI statement for reconciliation
 *   GET    /api/accounts/upi/unmatched  — Unmatched UPI transactions
 *   GET    /api/accounts/upi/reconciliation-report  — Reconciliation report
 */
@Injectable()
export class J02Service {
  constructor(
    @InjectRepository(J02Entity)
    private readonly repo: Repository<J02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J02 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
