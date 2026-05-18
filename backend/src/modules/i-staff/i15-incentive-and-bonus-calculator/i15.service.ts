import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I15Entity } from './i15.entity';
import { CreateI15Dto } from './dto/create-i15.dto';
import { UpdateI15Dto } from './dto/update-i15.dto';

/**
 * I15 — Incentive & Bonus Calculator
 *
 * Calculates incentive payouts based on configurable performance criteria.
 *
 * Endpoints implemented by I15Controller:
 *   GET    /api/staff/incentives/calculate  — Calculate incentives for period
 *   PUT    /api/staff/incentives/rules  — Update incentive rules
 *   GET    /api/staff/incentives/history  — Incentive payment history
 */
@Injectable()
export class I15Service {
  constructor(
    @InjectRepository(I15Entity)
    private readonly repo: Repository<I15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I15 record ${id} not found`);
    return found;
  }

  create(dto: CreateI15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
