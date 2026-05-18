import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { E11Entity } from './e11.entity';
import { CreateE11Dto } from './dto/create-e11.dto';
import { UpdateE11Dto } from './dto/update-e11.dto';

/**
 * E11 — Rush Hour Alert for Kitchen
 *
 * Notifies kitchen staff when incoming orders surge above a configurable threshold per hour.
 *
 * Endpoints implemented by E11Controller:
 *   GET    /api/kitchen/rush/current  — Current orders-per-hour rate
 *   PUT    /api/kitchen/rush/threshold  — Set rush threshold
 *   GET    /api/kitchen/rush/alerts  — Rush alert history
 */
@Injectable()
export class E11Service {
  constructor(
    @InjectRepository(E11Entity)
    private readonly repo: Repository<E11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`E11 record ${id} not found`);
    return found;
  }

  create(dto: CreateE11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateE11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
