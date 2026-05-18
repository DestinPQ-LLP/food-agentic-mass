import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I17Entity } from './i17.entity';
import { CreateI17Dto } from './dto/create-i17.dto';
import { UpdateI17Dto } from './dto/update-i17.dto';

/**
 * I17 — Staff Roster Planner
 *
 * Weekly roster view showing which staff are assigned to which shift, with coverage gaps highlighted.
 *
 * Endpoints implemented by I17Controller:
 *   GET    /api/staff/roster/week  — Weekly roster
 *   POST   /api/staff/roster/assign  — Assign staff to slot
 *   GET    /api/staff/roster/gaps  — Understaffed shifts
 */
@Injectable()
export class I17Service {
  constructor(
    @InjectRepository(I17Entity)
    private readonly repo: Repository<I17Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I17 record ${id} not found`);
    return found;
  }

  create(dto: CreateI17Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI17Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
