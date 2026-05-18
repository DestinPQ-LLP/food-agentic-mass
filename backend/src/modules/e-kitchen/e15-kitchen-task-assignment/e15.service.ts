import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E15Entity } from './e15.entity';
import { CreateE15Dto } from './dto/create-e15.dto';
import { UpdateE15Dto } from './dto/update-e15.dto';

/**
 * E15 — Kitchen Task Assignment
 *
 * Manager assigns specific preparation tasks (e.g., soak rice, grind batter) to kitchen staff.
 *
 * Endpoints implemented by E15Controller:
 *   POST   /api/kitchen/tasks  — Create kitchen task
 *   GET    /api/kitchen/tasks/today  — Today's tasks
 *   PUT    /api/kitchen/tasks/:id/complete  — Mark task complete
 */
@Injectable()
export class E15Service {
  constructor(
    @InjectRepository(E15Entity)
    private readonly repo: Repository<E15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E15 record ${id} not found`);
    return found;
  }

  create(dto: CreateE15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
