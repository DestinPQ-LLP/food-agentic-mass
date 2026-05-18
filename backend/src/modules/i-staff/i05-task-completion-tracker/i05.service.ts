import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I05Entity } from './i05.entity';
import { CreateI05Dto } from './dto/create-i05.dto';
import { UpdateI05Dto } from './dto/update-i05.dto';

/**
 * I05 — Task Completion Tracker
 *
 * Staff marks tasks as complete; manager sees completion rate in real time.
 *
 * Endpoints implemented by I05Controller:
 *   PUT    /api/staff/tasks/:id/complete  — Mark task complete
 *   GET    /api/staff/tasks/pending  — Pending tasks
 *   GET    /api/staff/tasks/completion-rate  — Completion rate by staff
 */
@Injectable()
export class I05Service {
  constructor(
    @InjectRepository(I05Entity)
    private readonly repo: Repository<I05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`I05 record ${id} not found`);
    return found;
  }

  create(dto: CreateI05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateI05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
