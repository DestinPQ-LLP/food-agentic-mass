import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E04Entity } from './e04.entity';
import { CreateE04Dto } from './dto/create-e04.dto';
import { UpdateE04Dto } from './dto/update-e04.dto';

/**
 * E04 — Production Batch Planner
 *
 * Daily planning tool for deciding how much batter, chutney, sambar, and other prep to make.
 *
 * Endpoints implemented by E04Controller:
 *   POST   /api/kitchen/batches  — Create a production batch plan
 *   GET    /api/kitchen/batches/today  — Today's batch plans
 *   PUT    /api/kitchen/batches/:id  — Update batch quantities
 */
@Injectable()
export class E04Service {
  constructor(
    @InjectRepository(E04Entity)
    private readonly repo: Repository<E04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E04 record ${id} not found`);
    return found;
  }

  create(dto: CreateE04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
