import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E05Entity } from './e05.entity';
import { CreateE05Dto } from './dto/create-e05.dto';
import { UpdateE05Dto } from './dto/update-e05.dto';

/**
 * E05 — Batter Quantity Estimator
 *
 * Estimates the quantity of idli/dosa batter required based on sales forecast and buffer stock.
 *
 * Endpoints implemented by E05Controller:
 *   GET    /api/kitchen/batter/estimate  — Estimated batter for today
 *   POST   /api/kitchen/batter/override  — Override estimate
 *   GET    /api/kitchen/batter/history  — Past batter usage log
 */
@Injectable()
export class E05Service {
  constructor(
    @InjectRepository(E05Entity)
    private readonly repo: Repository<E05Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E05 record ${id} not found`);
    return found;
  }

  create(dto: CreateE05Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE05Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
