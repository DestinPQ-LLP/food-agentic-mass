import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H07Entity } from './h07.entity';
import { CreateH07Dto } from './dto/create-h07.dto';
import { UpdateH07Dto } from './dto/update-h07.dto';

/**
 * H07 — Feedback Sentiment Analyser
 *
 * Classifies customer feedback text as positive, neutral, or negative using AI.
 *
 * Endpoints implemented by H07Controller:
 *   POST   /api/quality/sentiment/analyse  — Analyse feedback text
 *   GET    /api/quality/sentiment/summary  — Sentiment summary for period
 *   GET    /api/quality/sentiment/negative  — All negative feedback
 */
@Injectable()
export class H07Service {
  constructor(
    @InjectRepository(H07Entity)
    private readonly repo: Repository<H07Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H07 record ${id} not found`);
    return found;
  }

  create(dto: CreateH07Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH07Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
