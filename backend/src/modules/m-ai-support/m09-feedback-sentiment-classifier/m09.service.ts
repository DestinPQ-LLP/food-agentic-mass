import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { M09Entity } from './m09.entity';
import { CreateM09Dto } from './dto/create-m09.dto';
import { UpdateM09Dto } from './dto/update-m09.dto';

/**
 * M09 — Feedback Sentiment Classifier
 *
 * Classifies customer feedback as positive, neutral, or negative with category tagging.
 *
 * Endpoints implemented by M09Controller:
 *   POST   /api/ai/sentiment/classify  — Classify feedback text
 *   GET    /api/ai/sentiment/summary  — Sentiment summary for period
 *   GET    /api/ai/sentiment/trend  — Sentiment trend over time
 */
@Injectable()
export class M09Service {
  constructor(
    @InjectRepository(M09Entity)
    private readonly repo: Repository<M09Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`M09 record ${id} not found`);
    return found;
  }

  create(dto: CreateM09Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateM09Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
