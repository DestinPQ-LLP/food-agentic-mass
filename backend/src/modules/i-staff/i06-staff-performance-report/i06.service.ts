import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I06Entity } from './i06.entity';
import { CreateI06Dto } from './dto/create-i06.dto';
import { UpdateI06Dto } from './dto/update-i06.dto';

/**
 * I06 — Staff Performance Report
 *
 * Aggregates attendance, task completion, orders handled, and manager ratings per staff.
 *
 * Endpoints implemented by I06Controller:
 *   GET    /api/staff/:id/performance  — Individual performance report
 *   GET    /api/staff/performance/ranking  — Staff performance ranking
 *   GET    /api/staff/performance/team  — Team performance summary
 */
@Injectable()
export class I06Service {
  constructor(
    @InjectRepository(I06Entity)
    private readonly repo: Repository<I06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I06 record ${id} not found`);
    return found;
  }

  create(dto: CreateI06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
