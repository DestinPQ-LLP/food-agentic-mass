import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I14Entity } from './i14.entity';
import { CreateI14Dto } from './dto/create-i14.dto';
import { UpdateI14Dto } from './dto/update-i14.dto';

/**
 * I14 — Staff Productivity Dashboard
 *
 * Aggregated productivity metrics per staff: tasks, orders, attendance, and rating.
 *
 * Endpoints implemented by I14Controller:
 *   GET    /api/staff/productivity  — Team productivity overview
 *   GET    /api/staff/productivity/:staffId  — Individual productivity
 *   GET    /api/staff/productivity/trends  — Productivity trends
 */
@Injectable()
export class I14Service {
  constructor(
    @InjectRepository(I14Entity)
    private readonly repo: Repository<I14Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I14 record ${id} not found`);
    return found;
  }

  create(dto: CreateI14Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI14Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
