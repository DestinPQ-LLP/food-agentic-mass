import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H11Entity } from './h11.entity';
import { CreateH11Dto } from './dto/create-h11.dto';
import { UpdateH11Dto } from './dto/update-h11.dto';

/**
 * H11 — Hygiene Checklist Manager
 *
 * Daily hygiene checklist for kitchen and counter with completion tracking per shift.
 *
 * Endpoints implemented by H11Controller:
 *   GET    /api/quality/hygiene/checklist  — Today's hygiene checklist
 *   POST   /api/quality/hygiene/checklist/submit  — Submit checklist
 *   GET    /api/quality/hygiene/checklist/history  — Checklist completion history
 */
@Injectable()
export class H11Service {
  constructor(
    @InjectRepository(H11Entity)
    private readonly repo: Repository<H11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H11 record ${id} not found`);
    return found;
  }

  create(dto: CreateH11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
