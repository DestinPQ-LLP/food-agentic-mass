import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { A07Entity } from './a07.entity';
import { CreateA07Dto } from './dto/create-a07.dto';
import { UpdateA07Dto } from './dto/update-a07.dto';

/**
 * A07 — Staff Performance Dashboard
 *
 * Shows staff-wise attendance, task completion rate, and order-handling speed for the selected period.
 *
 * Endpoints implemented by A07Controller:
 *   GET    /api/owner/staff-performance  — Staff KPIs summary
 *   GET    /api/owner/staff-performance/:staffId  — Individual staff detail
 *   GET    /api/owner/staff-performance/shifts  — Shift-wise productivity
 */
@Injectable()
export class A07Service {
  constructor(
    @InjectRepository(A07Entity)
    private readonly repo: Repository<A07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`A07 record ${id} not found`);
    return found;
  }

  create(dto: CreateA07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateA07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
