import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I04Entity } from './i04.entity';
import { CreateI04Dto } from './dto/create-i04.dto';
import { UpdateI04Dto } from './dto/update-i04.dto';

/**
 * I04 — Task Assignment Engine
 *
 * Manager assigns specific tasks to staff with due time and priority.
 *
 * Endpoints implemented by I04Controller:
 *   POST   /api/staff/tasks  — Create task
 *   GET    /api/staff/tasks/today  — Tasks for today
 *   PUT    /api/staff/tasks/:id/assign  — Assign task to staff
 */
@Injectable()
export class I04Service {
  constructor(
    @InjectRepository(I04Entity)
    private readonly repo: Repository<I04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I04 record ${id} not found`);
    return found;
  }

  create(dto: CreateI04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
