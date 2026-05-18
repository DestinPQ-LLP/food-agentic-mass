import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M17Entity } from './m17.entity';
import { CreateM17Dto } from './dto/create-m17.dto';
import { UpdateM17Dto } from './dto/update-m17.dto';

/**
 * M17 — Staff Insights Generator
 *
 * AI summarises staff performance patterns, risk of attrition, and productivity trends.
 *
 * Endpoints implemented by M17Controller:
 *   GET    /api/ai/staff/insights  — AI staff insights
 *   GET    /api/ai/staff/attrition-risk  — Staff with high attrition risk
 *   GET    /api/ai/staff/top-performers  — AI-identified top performers
 */
@Injectable()
export class M17Service {
  constructor(
    @InjectRepository(M17Entity)
    private readonly repo: Repository<M17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M17 record ${id} not found`);
    return found;
  }

  create(dto: CreateM17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
