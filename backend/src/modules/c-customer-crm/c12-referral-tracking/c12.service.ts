import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { C12Entity } from './c12.entity';
import { CreateC12Dto } from './dto/create-c12.dto';
import { UpdateC12Dto } from './dto/update-c12.dto';

/**
 * C12 — Referral Tracking
 *
 * Tracks customers who referred others, awarding points or rewards for successful referrals.
 *
 * Endpoints implemented by C12Controller:
 *   POST   /api/crm/referrals  — Record a referral
 *   GET    /api/crm/referrals/:customerId  — Get referrals by customer
 *   GET    /api/crm/referrals/leaderboard  — Top referrers
 */
@Injectable()
export class C12Service {
  constructor(
    @InjectRepository(C12Entity)
    private readonly repo: Repository<C12Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`C12 record ${id} not found`);
    return found;
  }

  create(dto: CreateC12Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateC12Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
