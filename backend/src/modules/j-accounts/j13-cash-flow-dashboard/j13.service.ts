import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J13Entity } from './j13.entity';
import { CreateJ13Dto } from './dto/create-j13.dto';
import { UpdateJ13Dto } from './dto/update-j13.dto';

/**
 * J13 — Cash Flow Dashboard
 *
 * Shows cash inflows and outflows over time: daily, weekly, and monthly.
 *
 * Endpoints implemented by J13Controller:
 *   GET    /api/accounts/cashflow  — Cash flow data for period
 *   GET    /api/accounts/cashflow/projection  — 30-day cash flow projection
 *   GET    /api/accounts/cashflow/categories  — Cash flow by category
 */
@Injectable()
export class J13Service {
  constructor(
    @InjectRepository(J13Entity)
    private readonly repo: Repository<J13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J13 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
