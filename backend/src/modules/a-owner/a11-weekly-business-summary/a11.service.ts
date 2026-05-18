import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A11Entity } from './a11.entity';
import { CreateA11Dto } from './dto/create-a11.dto';
import { UpdateA11Dto } from './dto/update-a11.dto';

/**
 * A11 — Weekly Business Summary
 *
 * Auto-generated 7-day summary covering sales, footfall, wastage, top items, and key alerts.
 *
 * Endpoints implemented by A11Controller:
 *   GET    /api/owner/weekly-summary  — This week's summary
 *   GET    /api/owner/weekly-summary/compare  — This week vs last week
 *   POST   /api/owner/weekly-summary/send  — Send summary via WhatsApp
 */
@Injectable()
export class A11Service {
  constructor(
    @InjectRepository(A11Entity)
    private readonly repo: Repository<A11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A11 record ${id} not found`);
    return found;
  }

  create(dto: CreateA11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
