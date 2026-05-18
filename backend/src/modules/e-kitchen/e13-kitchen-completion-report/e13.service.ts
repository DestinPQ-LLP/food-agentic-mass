import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E13Entity } from './e13.entity';
import { CreateE13Dto } from './dto/create-e13.dto';
import { UpdateE13Dto } from './dto/update-e13.dto';

/**
 * E13 — Kitchen Completion Report
 *
 * End-of-day report summarising items prepared, served, held, wasted, and average prep time.
 *
 * Endpoints implemented by E13Controller:
 *   GET    /api/kitchen/report/daily  — Daily kitchen completion report
 *   GET    /api/kitchen/report/shift  — Shift-wise kitchen report
 *   GET    /api/kitchen/report/pdf  — Download as PDF
 */
@Injectable()
export class E13Service {
  constructor(
    @InjectRepository(E13Entity)
    private readonly repo: Repository<E13Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E13 record ${id} not found`);
    return found;
  }

  create(dto: CreateE13Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE13Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
