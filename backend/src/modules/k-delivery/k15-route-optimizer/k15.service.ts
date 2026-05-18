import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { K15Entity } from './k15.entity';
import { CreateK15Dto } from './dto/create-k15.dto';
import { UpdateK15Dto } from './dto/update-k15.dto';

/**
 * K15 — Route Optimizer
 *
 * Suggests the most efficient delivery sequence for agents with multiple stops.
 *
 * Endpoints implemented by K15Controller:
 *   POST   /api/delivery/routes/optimize  — Optimize delivery route
 *   GET    /api/delivery/routes/:agentId/today  — Today's route for agent
 *   GET    /api/delivery/routes/settings  — Optimization settings
 */
@Injectable()
export class K15Service {
  constructor(
    @InjectRepository(K15Entity)
    private readonly repo: Repository<K15Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`K15 record ${id} not found`);
    return found;
  }

  create(dto: CreateK15Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateK15Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
