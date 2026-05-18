import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I03Entity } from './i03.entity';
import { CreateI03Dto } from './dto/create-i03.dto';
import { UpdateI03Dto } from './dto/update-i03.dto';

/**
 * I03 — Shift Planner
 *
 * Creates and publishes weekly shift schedules assigning staff to shifts and roles.
 *
 * Endpoints implemented by I03Controller:
 *   POST   /api/staff/shifts  — Create shift
 *   GET    /api/staff/shifts/week  — Weekly shift schedule
 *   PUT    /api/staff/shifts/:id  — Update shift
 */
@Injectable()
export class I03Service {
  constructor(
    @InjectRepository(I03Entity)
    private readonly repo: Repository<I03Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I03 record ${id} not found`);
    return found;
  }

  create(dto: CreateI03Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI03Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
