import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I16Entity } from './i16.entity';
import { CreateI16Dto } from './dto/create-i16.dto';
import { UpdateI16Dto } from './dto/update-i16.dto';

/**
 * I16 — Overtime Tracker
 *
 * Logs hours worked beyond standard shift and calculates overtime pay.
 *
 * Endpoints implemented by I16Controller:
 *   POST   /api/staff/overtime/log  — Log overtime hours
 *   GET    /api/staff/overtime/:staffId  — Overtime by staff
 *   GET    /api/staff/overtime/summary  — Overtime summary for period
 */
@Injectable()
export class I16Service {
  constructor(
    @InjectRepository(I16Entity)
    private readonly repo: Repository<I16Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I16 record ${id} not found`);
    return found;
  }

  create(dto: CreateI16Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI16Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
