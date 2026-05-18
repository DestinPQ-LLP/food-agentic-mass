import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { J03Entity } from './j03.entity';
import { CreateJ03Dto } from './dto/create-j03.dto';
import { UpdateJ03Dto } from './dto/update-j03.dto';

/**
 * J03 — Revenue vs Cost Report
 *
 * Shows gross revenue, estimated COGS, and gross margin for a selected period.
 *
 * Endpoints implemented by J03Controller:
 *   GET    /api/accounts/revenue-vs-cost  — Revenue and cost for period
 *   GET    /api/accounts/revenue-vs-cost/monthly  — Monthly trend
 *   GET    /api/accounts/revenue-vs-cost/items  — Item-level contribution
 */
@Injectable()
export class J03Service {
  constructor(
    @InjectRepository(J03Entity)
    private readonly repo: Repository<J03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`J03 record ${id} not found`);
    return found;
  }

  create(dto: CreateJ03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJ03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
