import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E06Entity } from './e06.entity';
import { CreateE06Dto } from './dto/create-e06.dto';
import { UpdateE06Dto } from './dto/update-e06.dto';

/**
 * E06 — Chutney/Sambar Batch Tracker
 *
 * Tracks preparation and consumption of chutneys and sambar throughout the day.
 *
 * Endpoints implemented by E06Controller:
 *   POST   /api/kitchen/condiments/batch  — Log a condiment batch prepared
 *   GET    /api/kitchen/condiments/status  — Current condiment stock level
 *   GET    /api/kitchen/condiments/log  — Batch preparation history
 */
@Injectable()
export class E06Service {
  constructor(
    @InjectRepository(E06Entity)
    private readonly repo: Repository<E06Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E06 record ${id} not found`);
    return found;
  }

  create(dto: CreateE06Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE06Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
