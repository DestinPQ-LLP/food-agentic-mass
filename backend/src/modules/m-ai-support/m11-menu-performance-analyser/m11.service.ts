import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M11Entity } from './m11.entity';
import { CreateM11Dto } from './dto/create-m11.dto';
import { UpdateM11Dto } from './dto/update-m11.dto';

/**
 * M11 — Menu Performance Analyser
 *
 * AI-driven analysis of the menu: star performers, dogs, plowhorses, and puzzles.
 *
 * Endpoints implemented by M11Controller:
 *   GET    /api/ai/menu/analysis  — Full menu performance analysis
 *   GET    /api/ai/menu/stars  — Top performing items
 *   GET    /api/ai/menu/underperformers  — Underperforming items
 */
@Injectable()
export class M11Service {
  constructor(
    @InjectRepository(M11Entity)
    private readonly repo: Repository<M11Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M11 record ${id} not found`);
    return found;
  }

  create(dto: CreateM11Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM11Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
