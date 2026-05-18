import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { H02Entity } from './h02.entity';
import { CreateH02Dto } from './dto/create-h02.dto';
import { UpdateH02Dto } from './dto/update-h02.dto';

/**
 * H02 — Customer Feedback Form
 *
 * Extended feedback form with item-level ratings, comments, and optional contact.
 *
 * Endpoints implemented by H02Controller:
 *   POST   /api/quality/feedback  — Submit feedback
 *   GET    /api/quality/feedback  — List all feedback
 *   GET    /api/quality/feedback/items  — Feedback linked to items
 */
@Injectable()
export class H02Service {
  constructor(
    @InjectRepository(H02Entity)
    private readonly repo: Repository<H02Entity>,
  ) {}

  list(branchId?: string) {
    return this.repo.find({
      where: branchId ? { branchId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`H02 record ${id} not found`);
    return found;
  }

  create(dto: CreateH02Dto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateH02Dto) {
    await this.repo.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { ok: true };
  }
}
