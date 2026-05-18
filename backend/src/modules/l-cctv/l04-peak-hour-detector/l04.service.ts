import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { L04Entity } from './l04.entity';
import { CreateL04Dto } from './dto/create-l04.dto';
import { UpdateL04Dto } from './dto/update-l04.dto';

/**
 * L04 — Peak Hour Detector
 *
 * Automatically identifies peak periods from footfall data and highlights them for planning.
 *
 * Endpoints implemented by L04Controller:
 *   GET    /api/cctv/peaks/today  — Today's detected peak periods
 *   GET    /api/cctv/peaks/weekly  — Weekly peak pattern
 *   PUT    /api/cctv/peaks/settings  — Configure peak threshold
 */
@Injectable()
export class L04Service {
  constructor(
    @InjectRepository(L04Entity)
    private readonly repo: Repository<L04Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`L04 record ${id} not found`);
    return found;
  }

  create(dto: CreateL04Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateL04Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
