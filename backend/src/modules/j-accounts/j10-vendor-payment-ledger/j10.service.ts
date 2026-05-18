import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J10Entity } from './j10.entity';
import { CreateJ10Dto } from './dto/create-j10.dto';
import { UpdateJ10Dto } from './dto/update-j10.dto';

/**
 * J10 — Vendor Payment Ledger
 *
 * Tracks all payables to vendors: invoices, payments made, and outstanding balances.
 *
 * Endpoints implemented by J10Controller:
 *   GET    /api/accounts/payables/:vendorId  — Payables by vendor
 *   POST   /api/accounts/payables/pay  — Record vendor payment
 *   GET    /api/accounts/payables/total  — Total outstanding payables
 */
@Injectable()
export class J10Service {
  constructor(
    @InjectRepository(J10Entity)
    private readonly repo: Repository<J10Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J10 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ10Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ10Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
